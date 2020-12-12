<?php
  include('common.php');
  include('db.php');
  // include('emails.php');

  class PLMenu{
    protected $db;
    
    function __construct($db){ $this->db = $db; }

    public function addMenu($data){

      $err = false;
      $exists = array();

      try {
        // Check if this id exists
        $id = $data["id"];
        $exists = $this->db->fetch("SELECT * FROM x_platz_menu87134 WHERE x_id = '$id'");

        $isDark = 'no';
        if($data["isDark"]) $isDark = 'yes';

        // If yes, Update
        if($exists["result"]){
          // Edit dark/light
          $this->db->edit("x_platz_menu87134", 
            array("x_is_dark" => $isDark), 
            array("x_id"      => $id)
          );

          // Delete old values from pages table
          $this->db->delete("x_platz_page87134", array( "x_menu_id" => $id));
        } 
        // Else Insert to DB
        else {
          // Add to menu table
          $this->db->save("x_platz_menu87134", array(
            "x_id"      => $id,
            "x_type"    => $data["title"],
            "x_is_dark" => $isDark,
            "x_created" => date('Y-m-d H:i:s')
          ));
        }

        // Add to pages table for both update and insert
        $i = -1;
        foreach($data["pages"] as $page){
          $this->db->save("x_platz_page87134", array(
            "x_menu_id" => $id,
            "x_page_no" => ++$i,
            "x_data"    => json_encode($page),
          ));
        }
      } catch (Exception $e) {
        $err = true;
        Common::respond($e, "There was an error inserting in DB, please try again.", false);
      }

      !$err && Common::respond(array($data, $exists), "Menu saved successfully.", true);
    }

    public function getMenu($id){

      $exists = array();
      try {
        // Check if this id exists
        $exists = $this->db->fetch("SELECT * FROM x_platz_menu87134 WHERE x_id = '$id'");
        if(!$exists["result"]){
          Common::respond(null, "Menu does not exist.", false);
        } else {
          $dbResult = $this->db->fetch(
            " SELECT 
                x_platz_menu87134.x_id,
                x_platz_menu87134.x_type,
                x_platz_menu87134.x_is_dark,
                x_platz_page87134.x_data
              FROM `x_platz_menu87134` 
              INNER JOIN `x_platz_page87134` 
              ON x_platz_menu87134.x_id = x_platz_page87134.x_menu_id 
              WHERE x_platz_page87134.x_menu_id = '$id'
              ORDER BY x_platz_page87134.x_page_no ASC 
            "
          );

          $data = $dbResult["data"];
          $isDark = false;
          if($data[0]["x_is_dark"] === 'yes') $isDark = true;

          $output = array(
            "menu" => array(
              "activePage" => 0,
              "id" => $data[0]["x_id"],
              "title" => $data[0]["x_type"],
              "isDark" => $isDark,
              "pages" => array()
            ),
          );
          foreach ($data as $page) {
            $output["menu"]["pages"][] = json_decode($page["x_data"]);
          }

          // Common::respond(array($output, $isDark), "Menu fetched successfully.", true);
          Common::respond($output, "Menu fetched successfully.", true);
        }
      } catch (Exception $e) {
        Common::respond($e, "There was an error fetching from DB, please try again.", false);
      }
    }

  }

  $m = new PLMenu($db);
  switch ($params["t"]) {
    case 'save':
      $m->addMenu($params["d"]);
      // Common::respond($params["d"], "Test", true);
    break;
    
    case 'get':
      $m->getMenu($params["d"]);
    break;

    default: // qr
    break;
  }
?>