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

    public static function sendEmail($data){

      $date = date('Y-m-d H:i:s');
      $emailObj = array();

      // carriage return type (RFC)
      $eol = PHP_EOL;
      
      $username = $data['f'] ." ". $data['l'];

      // Mail for user
      $headers = "MIME-Version: 1.0". $eol;
      $headers.= "Content-type:text/html;charset=UTF-8". $eol;
      $headers.= "From: Paul from Platzieren <paul@cloudbasiert.com>";

      $to = $data['em'];
      $subject = $username." | Order Confirmation from Platzieren.com";

      $txt = "<div style='font-size: 1rem;'>";
      $txt.= "  Hi ".$username.",<br/><br/>";
      $txt.= "  Thanks for your order.<br/>Below are your order details:<br/><br/>";
      $txt.= "  <b>Transaction ID: </b>".$data['id']."<br/>";
      $txt.= "  <b>Selected Size: </b>".$data['sz']."<br/>";
      $txt.= "  <b>Your Email: </b>".$data['em']."<br/>";
      $txt.= "  <b>Your Telephone: </b>".$data['ph']."<br/><br/>";      
      $txt.= "  <b>Shipping Address: </b>".$data["full_addr"]."<br/>";
      $txt.= "  Thanks and Regards,<br/>";
      $txt.= "  Paul from Platzieren";
      $txt.= "</div>";          

      $emailObj[] = array(
        "to" => $to,
        "subject" => $subject,
        "txt" => $txt,
        "headers" => $headers,
        "env" => $GLOBALS['env']
      );

      // Mail for company 
      $headers = "MIME-Version: 1.0". $eol;
      $headers.= "Content-type:text/html;charset=UTF-8". $eol;
      $headers.= "From: Platzieren Team <team@platzieren.com>";
      
      $to = implode(", ", $GLOBALS['recipients']);
      $subject = "New Order @ Platzieren.com | ".$username;

      $txt = "<div style='font-size: 1rem;'>";
      $txt.= "  Hallo Paul,<br/><br/>";
      $txt.= "  A new user has placed an order. Below are the order details:<br/><br/>";
      $txt.= "  <b>Name: </b>".$username."<br/>";
      $txt.= "  <b>Email: </b>".$data['em']."<br/>";
      $txt.= "  <b>Telephone: </b>".$data['ph']."<br/>";    
      $txt.= "  <b>Transaction ID: </b>".$data['id']."<br/>";
      $txt.= "  <b>Selected Size: </b>".$data['sz']."<br/>";
      $txt.= "  <b>Shipping Address: </b>".$data["full_addr"]."<br/>";
      $txt.= "  <b>Order Date & Time: </b>".$date."<br/><br/>";
      $txt.= "  Thanks and Regards,<br/>";
      $txt.= "  Platzieren Team";
      $txt.= "</div>";
    
      $emailObj[] = array(
        "to" => $to,
        "subject" => $subject,
        "txt" => $txt,
        "headers" => $headers,
        "env" => $GLOBALS['env']
      );

      // if($GLOBALS['env'] === "local") return $emailObj;
      // else return mail($to, $subject, $body, $headers);

      if($GLOBALS['env'] === "local"){
        return $emailObj;
      } else {
        $sent = true;
        
        foreach ($emailObj as $key => $value) {
          $to      = $value["to"];
          $subject = $value["subject"];
          $txt     = $value["txt"];
          $headers = $value["headers"];
          $sent    = $sent && mail($to, $subject, $txt, $headers);
        }
        return $sent;
      }
    }
  }

  // Reading the input
  // $data = $_REQUEST;
  $params = json_decode($_REQUEST["params"], true);
?>