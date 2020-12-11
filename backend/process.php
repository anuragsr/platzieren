<?php
  include('common.php');
  include('db.php');
  // include('emails.php');

  // $ship_id = '';
  // $currentPath = '';

  class PLMenu{
    protected $db;
    
    function __construct($db){ $this->db = $db; }

    public function addShipment($data){

      $ship_id = 'S'.Common::generateRand(5);
      $err = false;
          
      // Add to DB
      try {
        $ship_type = "Packed: ";
        if($data["isPacked"] === "true") $ship_type.= "Yes";
        else $ship_type.= "No";
        $ship_type.=", Type: ". $data["selOpts"];

        $this->db->save("x_vs_ship79332", array(
          "id"             => $ship_id,
          "x_from"         => $data["vonStadt"],
          "x_to"           => $data["nachStadt"],
          "x_fname"        => $data["fname"],
          "x_lname"        => $data["lname"],
          "x_email"        => $data["email"],
          "x_phone"        => $data["phone"],
          "x_street"       => $data["street"],
          "x_postcode"     => $data["postcode"],
          "x_place"        => $data["place"],
          "x_shp_type"     => $ship_type,
          "x_shp_con"      => "Containers: ".$data["numCon"].", Filled: ".$data["filled"].", Container Weights: ".$data["conWeights"],
          "x_shp_date"     => $data["date"],
          "x_date_commit"  => $data["isDateCommit"] === "true" ? "Yes" : "No", 
          "x_created"      => date('Y-m-d H:i:s')
        ));
      } catch (Exception $e) {
        $err = true;
        Common::respond($e, "There was an error inserting in DB, please try again.", false);
      }

      // Upload files
      try {
        $files = $data["files"];
          
        // Create folder
        $currentPath = "../upload/".$ship_id." - ".$data['fname'];
        mkdir($currentPath, 0755, true);
        
        $data["path"] = $currentPath;
        $data["ship_id"] = $ship_id;

        if(count($files)){
          foreach ($files as $file){
            move_uploaded_file($file["tmp_name"], $currentPath."/".Common::generateRand(6)."_".$file["name"]);          
          }      
        }
      } catch (Exception $e) {
        $err = true;
        Common::respond($e, "There was an error uploading files, please try again.", false);
      }

      !$err && Common::respond(Common::sendEmail($data, "company"), "Shipment details added successfully.", true);
    }

  }

  $m = new PLMenu($db);
  Common::respond($data, "Testing.", null);
  // switch($_REQUEST["type"]){
  //   case 'addShipment': $e->addShipment($data); break;
  //   default: Common::respond("", "Attempted to send email to user.", Common::sendEmail($data, "user"));
  // }
?>