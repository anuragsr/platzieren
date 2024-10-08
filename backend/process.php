<?php
  include('common.php');
  include('db.php');
  include('emails.php');

  class PLMenu{
    protected $db;
    
    function __construct($db){ $this->db = $db; }        

    public function addMenu($data, $files){

      $err = false;
      $exists = array();

      try {
        // Check if this id exists
        $id = $data["id"];

        // Create directory (can be unused)
        $directory = "upload/".$id;
        if(!is_dir("../".$directory)) Common::makeDir("../".$directory);

        $exists = $this->db->fetch("SELECT * FROM x_platz_menu87134 WHERE x_id = '$id'");

        $isDark = 'no';
        if($data["isDark"]) $isDark = 'yes';

        // If yes, Update
        if($exists["result"]){
          // Image upload
          if(count($files)){
            $file = $files[0];
            $imgPath = $directory."/".Common::generateRand(6)."_".$file["name"];
            move_uploaded_file($file["tmp_name"], "../".$imgPath);

            // Edit dark/light, qrLogo
            $this->db->edit("x_platz_menu87134", 
              array("x_qrlogo" => $data["base"].$imgPath), 
              array("x_id"     => $id)
            );            
          }

          // Edit dark/light, qrLogo
          $this->db->edit("x_platz_menu87134", 
            array("x_is_dark" => $isDark), 
            array("x_id"      => $id)
          );

          // Delete old values from pages table
          $this->db->delete("x_platz_page87134", array( "x_menu_id" => $id));          
        } 
        // Else Insert to DB
        else {
          $imgPath = $data["qrLogo"];
          
          // Image upload
          if(count($files)){
            $file = $files[0];
            $imgPath = $directory."/".Common::generateRand(6)."_".$file["name"];
            move_uploaded_file($file["tmp_name"], "../".$imgPath);
          }

          // Add to menu table
          $this->db->save("x_platz_menu87134", array(
            "x_id"      => $id,
            "x_type"    => $data["title"],
            "x_is_dark" => $isDark,
            "x_qrlogo"  => $data["base"].$imgPath,
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
        Common::respond($e, "There was an error saving menu, please try again.", false);
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
                x_platz_menu87134.x_qrlogo,
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
              "qrLogo" => $data[0]["x_qrlogo"],
              "pages" => array()
            ),
          );

          foreach ($data as $page) {
            $output["menu"]["pages"][] = json_decode($page["x_data"]);
          }

          Common::respond($output, "Menu fetched successfully.", true);
        }
      } catch (Exception $e) {
        Common::respond($e, "There was an error fetching from DB, please try again.", false);
      }
    }

    public function addOrder($data){

      $err = false;
      try {
        // Add to purchase table
        $data["full_addr"] = $data["add1"].", ".$data["add2"].", ".$data["c"].", ".$data["p"];

        $this->db->save("x_platz_purc87134", array(
          "x_trans_id" => $data["id"],
          "x_size"     => $data["sz"],
          "x_fname"    => $data["f"],
          "x_lname"    => $data["l"],
          "x_email"    => $data["em"],
          "x_phone"    => $data["ph"],
          "x_addr"     => $data["full_addr"]
        ));
      } catch (Exception $e) {
        $err = true;
        Common::respond($e, "There was an error inserting in DB, please try again.", false);
      }

      !$err && Common::respond(Common::sendEmail($data), "Thanks for the order, our team will get in touch shortly.", true);
    }
  }

  $m = new PLMenu($db);
  // Common::respond($params, "Testing data", true); break;

  switch ($params["t"]) {
    case 'save': $m->addMenu($params["d"], $params["files"]); break;
    case 'get': $m->getMenu($params["d"]); break;
    default: $m->addOrder($params["d"]); break; // 'payment details'
  }
?>