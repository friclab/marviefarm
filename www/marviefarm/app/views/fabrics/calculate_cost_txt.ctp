<?php

$noDetailsTxt = "";
foreach($costs as $art => $vars){


	$txt=$art."\n";

	$txt.="Variante\tID\tMateriale\tPrice\tQta\tUMI\tTotale\n";

	foreach($vars as $var =>$mats){
		$totVariante=0;

		$txt.=$var."\n";

		foreach($mats as $mat){
		 $txt.="\t".
		 $mat['compo'].'-'.$mat['compo_id']."\t".
		 $mat['mat_code'].' - '.$mat['mat_desc']."\t"
		 .number_format($mat['price'],3,',','.')."\t"
		 .number_format($mat['qta'],3,',','.')."\t"
		 .$mat['um']."\t"
		 .number_format($mat['cost'],3,',','.')."\t".
					"\n";

			$totVariante=$totVariante+$mat['cost'];
		}
			
		$summary = $art."\t".$var."\t".number_format($totVariante,3,',','.')."\tX".$multiplier."\t".number_format($totVariante*$multiplier,3,',','.');
		$txt.="\t\t\t\t\t\t\t".$summary."\n\n";
		$noDetailsTxt.=$summary."\n";

	}
	$txt.="\nXXXXXXXXX\tXXXXXXXXX\tXXXXXXXXX\tXXXXXXXXX\tXXXXXXXXX\tXXXXXXXXX\t\n\n\n\n";
	$noDetailsTxt.="\nXXXXXXXXX\tXXXXXXXXX\tXXXXXXXXX\tXXXXXXXXX\tXXXXXXXXX\tXXXXXXXXX\t\n\n";
	if($showDetails){
		echo $txt;
	}
}

if(!$showDetails){
	echo $noDetailsTxt;
}
?>