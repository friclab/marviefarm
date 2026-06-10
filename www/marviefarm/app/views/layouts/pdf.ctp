<?php 
header("Content-type: application/pdf"); 
header('Content-Disposition: attachment; filename="'.$filename.'" ');
echo $content_for_layout; 
?>