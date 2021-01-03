<?php 
  mysqli_report(MYSQLI_REPORT_ERROR | MYSQLI_REPORT_STRICT);
  
  // Choose an env -> ["local", "eca", "prod"]
  // $env = "local";
  // $env = "eca";
  $env = "prod";

  switch($env){
    case "eca": 
      define("DB_HOST", "localhost");
      define("DB_USER", "x_nota_usr");
      define("DB_PASS", "x_nota_usr123");
      define("DB_NAME", "x_cbasiert_db27901");
    break;
    
    case "prod": 
      define("DB_HOST", "localhost");
      define("DB_USER", "x_cb_user");
      define("DB_PASS", ".PR+ry3[9sAl");
      define("DB_NAME", "cbasiert_db27901");
    break;
    
    default: // local
      define("DB_HOST", "localhost");
      define("DB_USER", "root");
      define("DB_PASS", "");
      define("DB_NAME", "x_cbasiert_db27901");
    break;
  }
  
  class DBUtil extends mysqli{
    function __construct($h, $u, $p, $d){
      parent::__construct($h, $u, $p, $d);
    }

    public function fetch($q){
      $m = array("result" => false, "data" => array());
      $r = $this->query($q);
      if ($r->num_rows > 0) {
        $arr = array();
        while($row = $r->fetch_assoc()) {
          $arr[] = $row;
        }
        $m["result"] = true;
        $m["data"] = $arr;
      }
      return $m;
    }

    public function save($table, $fields){
      $length = count($fields);
      $refArr = array();
      $values = "";
      $q = "";
      $i = 0;

      foreach ($fields as $key => &$ref){
        if($i < $length - 1){
          $values.= "$key, ";
          $q.= "?, ";
        }else{
          $values.= "$key";          
          $q.= "?";
        }
        $refArr[] = &$ref; 
        $i++;
      }
      
      unset($ref);
      $str  = "INSERT INTO $table ( ".$values." ) VALUES ( ".$q." )";
      $stmt = $this->prepare($str);

      call_user_func_array(
        array($stmt, "bind_param"),
        array_merge(array(str_repeat("s", $length)), $refArr)
      );

      return $stmt->execute();
    }

    public function edit($table, $fields, $conditions){
      $length = count($fields);
      $clength = count($conditions);
      $refArr = array();
      $values = "";
      $conds = "";
      $i = 0;

      foreach ($fields as $key => &$ref){
        if($i < $length - 1){
          $values.= "$key = ?, ";
        }else{
          $values.= "$key = ?";          
        }
        $refArr[] = &$ref;
        $i++;
      }

      $i = 0;
      foreach ($conditions as $key => &$ref){
        if($i == 0){
          $conds.= "$key = ? ";
        }else{
          $conds.= "AND $key = ? ";
        }
        $refArr[] = &$ref;
        $i++;
      }
      unset($ref);
      
      $str  = "UPDATE $table SET ".$values." WHERE ".$conds;
      $stmt = $this->prepare($str);

      $length+= $clength;
      call_user_func_array(
        array($stmt, "bind_param"),
        array_merge(array(str_repeat("s", $length)), $refArr)
      );

      return $stmt->execute();
    }

    public function delete($table, $conditions){
      $i = 0;
      $conds = "";

      foreach ($conditions as $key => $value){
        if($i == 0){
          $conds.= "$key = '$value' ";
        }else{
          $conds.= "AND $key = '$value' ";
        }
        $i++;
      }
      $q = "DELETE FROM $table WHERE ".$conds;
      return $this->query($q);
    }
  }

  $db = new DBUtil(DB_HOST, DB_USER, DB_PASS, DB_NAME);
  if($db->connect_error) die("Connection failed: " . $db->connect_error);
  $db->query("SET NAMES 'utf8'");
?>