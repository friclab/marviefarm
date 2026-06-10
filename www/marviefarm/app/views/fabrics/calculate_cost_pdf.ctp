<?php
App::import('Vendor','xtcpdf');


$pdf = new XTCPDF(PDF_PAGE_ORIENTATION, PDF_UNIT, PDF_PAGE_FORMAT, true, 'UTF-8', false);


// *

// set document information
$pdf->SetCreator(PDF_CREATOR);
$pdf->SetAuthor('Marvielab');
$pdf->SetTitle('Marvielab - Cost X'.$multiplier);



// set default header data
//$pdf->SetHeaderData(PDF_HEADER_LOGO, PDF_HEADER_LOGO_WIDTH, PDF_HEADER_TITLE, PDF_HEADER_STRING);

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
$pdf->SetFont('Courier', 'BI', 8);



// add a page
$pdf->AddPage();







foreach($costs as $art => $vars){
	$html='<div><table border="1" cellspacing="0" cellpadding="0">
	<tr bgcolor="#BBBBBB" ><th colspan="6"><b>'.$art.'</b></th></tr>
 
<tr> 
	<th></th>	 
	<th>Materiale</th>
	<th>UMI</th>
	<th>Costo</th>
	<th>Qta</th>
	<th>Totale</th> 
</tr>'; 

	$gray=1;
	foreach($vars as $var =>$mats){
		$html.='<tr ';
		if($gray%2==0) {
			$html.= ' bgcolor="#E6E6E6"  ';
		}
		$html.=' ><td>Variante: </td><td colspan="5"><b>'.$var.'</b></td></tr>';

		$totVariante = 0;

		foreach($mats as $mat){
			$html.='   <tr';
			if($gray%2==0) {
				$html.= ' bgcolor="#E6E6E6"  ';
			}
			$html.=' >
					<td></td>
					<td>'.$mat['mat_code'].' - '.$mat['mat_desc'].'</td>
					<td>'.$mat['qta'].'</td>
					<td>'.$mat['um'].'</td>
					<td>'.$mat['price'].'</td>
					<td>'.$mat['cost'].'</td>
					</tr>';
				
			$totVariante=$totVariante+$mat['cost'];
		}
		$html.='<tr';
		if($gray%2==0) {
			$html.= ' bgcolor="#E6E6E6"  ';
		}
		$html.=' ><td colspan="3">TOTALE ('.$var.')</td><td>'.$totVariante.'</td><td>X'.$multiplier.'</td><td>'.$totVariante*$multiplier.'</td></tr>';
			
		$gray++;
	}
	$html .= '</table></div><br/> ';
	$pdf->writeHTML($html, true, false, true, true, '');
}





// ---------------------------------------------------------

//Close and output PDF document
$pdf->Output('cost.pdf', 'I');

//
?>