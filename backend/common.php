<?php
  header('Access-Control-Allow-Origin: *');
  header('Access-Control-Allow-Headers: Content-Type');
  header('Access-Control-Allow-Methods: GET, POST, OPTIONS');  

  class Common{
    public static function respond($data, $message, $result){
      echo json_encode(array(
        "data" => $data,
        "message" => $message,
        "result" => $result
      ));
    }
  }

  // Reading the input
  $data = $_REQUEST;
  // $data["files"] = Common::normalizeFiles($_FILES);
  // $data = json_decode(file_get_contents('php://input'), true);
?>