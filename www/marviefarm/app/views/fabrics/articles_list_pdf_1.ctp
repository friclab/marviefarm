<?php
App::import('Vendor','xtcpdf');


$pdf = new XTCPDF(PDF_PAGE_ORIENTATION, PDF_UNIT, PDF_PAGE_FORMAT, true, 'UTF-8', false);


// *

// set document information
$pdf->SetCreator(PDF_CREATOR);
$pdf->SetAuthor('Marvielab');
$pdf->SetTitle('Marvielab - Articles');



// set default header data
$pdf->SetHeaderData(PDF_HEADER_LOGO, PDF_HEADER_LOGO_WIDTH, PDF_HEADER_TITLE, PDF_HEADER_STRING);

// set header and footer fonts
$pdf->setHeaderFont(Array(PDF_FONT_NAME_MAIN, '', PDF_FONT_SIZE_MAIN));
$pdf->setFooterFont(Array(PDF_FONT_NAME_DATA, '', PDF_FONT_SIZE_DATA));

// set default monospaced font
$pdf->SetDefaultMonospacedFont(PDF_FONT_MONOSPACED);

//set margins
$pdf->SetMargins(PDF_MARGIN_LEFT, PDF_MARGIN_TOP, PDF_MARGIN_RIGHT);
$pdf->SetHeaderMargin(PDF_MARGIN_HEADER);
$pdf->SetFooterMargin(PDF_MARGIN_FOOTER);

//set auto page breaks
$pdf->SetAutoPageBreak(TRUE, PDF_MARGIN_BOTTOM);

//set image scale factor
$pdf->setImageScale(PDF_IMAGE_SCALE_RATIO);

//set some language-dependent strings
$pdf->setLanguageArray($l);

// ---------------------------------------------------------

// set font
$pdf->SetFont('Courier', 'BI', 10);



// add a page
$pdf->AddPage();


// set font
$pdf->SetFont('Courier', 'BI', 8);



$i=1;
foreach($articles as $project => $listArticles){

		$html='
		<div ';
		if($i>1){
			 
			$html.=' style="page-break-before: always;" ';
		}
		$html.='><b>'.$project.'</b><br/>
		 <table border="1" cellspacing="2" cellpadding="2">
		<tr> 
			<th width="20%"></th>
			<th width="15%">Var</th>
			<th width="25%">Desc</th>
			<th align="right"  width="20%">Price (€)</th> 
			<th align="right"  width="20%">&nbsp;</th> 
		</tr>
		'; 

		foreach($listArticles as $artId=>$artDetails){
		$html.='<tr>
<td align="center">('.$artDetails['sex'].') '.$artDetails['name'].'<br/><img src="http://'.$_SERVER['SERVER_NAME'].'/marviefarm/articles/show/'.$artId.'"  height="70" border="0" /></td>
<td colspan="3"><table  >';

		$gray=1;
		foreach($artDetails['vars'] as $v=>$vars){
		//	$cippa=var_export($vars,true).'xxxxx';
			//$pdf->writeHTML($cippa, true, false, true, true, '');
			 
				$html.='   <tr ';
				if($gray%2==0) {
					$html.= ' bgcolor="#E6E6E6"  ';
				}
				$html.=' >
		<td width="20%">'.$vars['fab_code'].'</td>
		<td width="45%" >'.$vars['fab_desc'].'</td>
		<td width="35%" align="right">'.number_format($vars['price'],2).'</td>	 
		</tr>';
				$gray++;
			 
		}
		$html .= '</table></td></tr>';
	}

	$html.='</table></div>';

	// output the HTML content
	$pdf->writeHTML($html, true, false, true, true, '');
	
	$i++;
}






// ---------------------------------------------------------

//Close and output PDF document
$pdf->Output('order_'.$head[0]['ot']['order_number'].'_'.$head[0]['cl']['company'].'.pdf', 'I');

//
?>