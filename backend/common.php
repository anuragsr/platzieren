<?php
  // Report all PHP errors
  error_reporting(E_ALL);

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
    
    public static function generateRand($length = 4) {
      $characters = '0123456789';
      $charactersLength = strlen($characters);
      $randomString = '';
      for ($i = 0; $i < $length; $i++) {
        $randomString .= $characters[rand(0, $charactersLength - 1)];
      }
      return $randomString;
    }

    public static function makeDir($path, $perm = 0755){
      return mkdir($path, $perm, true);
    }
    
    public static function normalizeFiles($files = array()) {
      $normalized_array = array();
      foreach($files as $index => $file) {
        if (!is_array($file['name'])) {
          $normalized_array[$index][] = $file;
          continue;
        }
        foreach($file['name'] as $idx => $name) {
          $normalized_array[$index][$idx] = array(
            'name' => $name,
            'type' => $file['type'][$idx],
            'tmp_name' => $file['tmp_name'][$idx],
            'error' => $file['error'][$idx],
            'size' => $file['size'][$idx]
          );
        }
      }

      if(array_key_exists("files", $normalized_array)) return $normalized_array["files"];
      else return $normalized_array;
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
        "body" => $txt,
        "headers" => $headers,
        "env" => $GLOBALS['env']
      );
      
      // Preparing attachments
      // $content = chunk_split($data["qrCodeImg"]);
      $content = $data["qrCodeImg"];
      $attName = "QRCode - ".$data["menuId"].".png";

      // a random hash will be necessary to send mixed content
      $separator = md5(time());

      // Common Headers for email
      // main header (multipart mandatory)
      $headers = "From: Platzieren Team <team@platzieren.com>" . $eol;
      $headers .= "Reply-To: qp56@gmx.de" . $eol;
      $headers .= "Return-Path: qp56@gmx.de" . $eol;
      $headers .= "MIME-Version: 1.0" . $eol;
      $headers .= "Content-Type: multipart/mixed; boundary=\"" . $separator . "\"" . $eol;
      $headers .= "Content-Transfer-Encoding: 7bit" . $eol;
      $headers .= "This is a MIME encoded message." . $eol;    

      // Email Text
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
      $txt.= "  <b>QR Code: </b><br/><img src='cid:qrimg' alt='QR Code' height='300' /><br/><br/>";
      $txt.= "  Thanks and Regards,<br/>";
      $txt.= "  Platzieren Team";
      $txt.= "</div>";

      $body = "--" . $separator . $eol;
      
      // Message
      $body .= "Content-Type: text/html; charset=UTF-8" . $eol;
      $body .= "Content-Transfer-Encoding: 8bit" . $eol. $eol;
      $body .= $txt . $eol;

      $body .= "--" . $separator . $eol;
      
      // Email Attachment
      $body .= "Content-Location: CID:somethingatelse;" . $eol;
      $body .= "Content-ID: <qrimg>" . $eol;
      $body .= "Content-Type: image/png" . $eol;
      $body .= "Content-Transfer-Encoding: base64" . $eol;

      $content = str_replace('data:image/png;base64,', '', $content);
      $body .= $content . $eol;

      $body .= "--" . $separator . "--";
      
      $to = implode(", ", $GLOBALS['recipients']);
      $subject = "New Order @ Platzieren.com | ".$username;
    
      $emailObj[] = array(
        "to" => $to,
        "subject" => $subject,
        "body" => $body,
        "headers" => $headers,
        "env" => $GLOBALS['env']
      );

      if($GLOBALS['env'] === "local"){
        return $emailObj;
      } else {
        $sent = true;
        
        foreach ($emailObj as $key => $value) {
          $to      = $value["to"];
          $subject = $value["subject"];
          $body    = $value["body"];
          $headers = $value["headers"];
          $sent    = $sent && mail($to, $subject, $body, $headers);
        }

        return $sent;
        // $emailObj[] = $sent;
        // return $emailObj;
      }
    }
  }

  // Reading the input
  $params = json_decode($_REQUEST["params"], true);
  $params["files"] = Common::normalizeFiles($_FILES);
?>