<?php
header('Content-type: ' . $file['type']);
if(!isset($inpage)) header('Content-Disposition: attachment; filename="'.$file['name'].'"');
echo $content_for_layout;
//die();
?>