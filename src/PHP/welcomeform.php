<?php                                                  
 
     
// variables *********
$EmailTo = "support@prodigy-gaming.com";  
$Subject = "Website Registration";
$Name = Trim(stripslashes($_POST['name'])); 
$Email = Trim(stripslashes($_POST['email']));
$State = Trim(stripslashes($_POST['state']));


// prepare email body text *********
$Body = "";
$Body .= "Full Name: ";
$Body .= $Name;
$Body .= "\n";
$Body .= "Email Address: ";
$Body .= $Email;
$Body .= "\n";
$Body .= "State: "; 
$Body .= $State; 

 
// send email *********
mail($EmailTo, $Subject, $Body, "From: <$Email>");
	
	
?>