<?php
App::import('Vendor','xtcpdf');


$pdf = new XTCPDF(PDF_PAGE_ORIENTATION, PDF_UNIT, PDF_PAGE_FORMAT, true, 'UTF-8', false);


// *

// set document information
$pdf->SetCreator(PDF_CREATOR);
$pdf->SetAuthor('Marvielab');
$pdf->SetTitle('Marvielab - Order #'.$head[0]['ot']['order_number'].' - '.$head[0]['cl']['company']);



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
$pdf->SetFont('Courier', 'BI', 12);



// add a page
$pdf->AddPage();



$html = ' ';



// output the HTML content
$pdf->writeHTML($html, true, false, true, true, '');
// set font
$pdf->SetFont('Courier', 'BI', 8);

$html='
<div>
 <table border="1" cellspacing="2" cellpadding="2">

<tr> 
	<th width="16%">Article</th>
	<th width="84%"></th> 
</tr>

'; 

$groupRow=5;
$totrighe=0;
$maxrighe=55;  
$breakPage=array();
$items=1;



foreach($details as $art_id => $rows){

	 
	if($totrighe>$maxrighe){
		$totrighe=0;
		$breakPage[$items]=true;
	}
	$parzialeRighe=2; 
	foreach($rows['fabrics']  as $row){
		$parzialeRighe++; 
	}
	$parzialeRighe = ($parzialeRighe < $groupRow)?$groupRow: $parzialeRighe;
	$totrighe = $totrighe +$parzialeRighe;
	$items++;
}


 $numrighe=1;
$items=1;
foreach($details as $art_id => $rows){
 
	
	if($breakPage[$items]==true  ){ 
		$html.='<tr style="page-break-before: always;">'; 
$numrighe=1;
	}else{
		$html.='<tr>';
	}
	$html.='
<td align="center">'.$rows['name'].'<br/><img src="http://'.$_SERVER['SERVER_NAME'].'/marviefarm/articles/show/'.$art_id.'"  height="70" border="0" /></td>
<td ><table  >';

	$gray=1;

	$html.='<tr><td width="50%"  align="center">SIZE</td>';

	$sizes=0;
	foreach($rows['sizes'] as $row){
			
		$sizes++;
	}
	$w = floor(50/$sizes);
	foreach($rows['sizes'] as $row){
		$html.='<td  width="'.$w.'%">'.$row.'</td>';
	}
	$html.='</tr>';
	$numrighe++;
	foreach($rows['fabrics'] as $j=> $row){

		$star = '';
		if (in_array($row['id'], $choose)) {
			$star= ' * ';
		}

		$html.='  <tr ';
		if($gray%2==1) {
			$html.= ' bgcolor="#E6E6E6"  ';
		}
		$html.=' >
	<td width="50%" align="left">'.$row['description'].' (€ '.number_format($row['price'],2).')'.'</td> 
	<td colspan="'.$sizes.'" align="right"></td>
	</tr>';
		$gray++;
		$numrighe++;
	}
	$items++;
	$html .= '</table></td></tr>';
}


$html.='</table></div>';

// output the HTML content
$pdf->writeHTML($html, true, false, true, true, '');

/*
 $myFile = "/works/php/php_workspace/bah/cippa.html";
 $fh = fopen($myFile, 'w') or die("can't open file");
 $stringData = $html;
 fwrite($fh, $stringData);
 fclose($fh);


 $pdf->SetFont('Courier', '', 6);

 $html="
 <div style=\"font-size=8px;\"><p><b>
 TERMS AND CONDITIONS OF SALE.</b>By placing this order you confirm your unconditional acceptance of these Conditions.
 By accepting the Terms and Conditions when confirming your order, you confirm your unconditional acceptance of these Conditions.
 The contract for supply of goods will be formed when we accept your order. Acceptance of an order by us can only be made in writing form.
 Once you have signed the order, it cannot be cancelled or modified in its Term and Condition of sale.
 Any changes in numbers of items should be given with a written notice up to seven working days after signing this order.
 After the cancel date has passed, you agree to accept full shipment and are responsible for payment for the entire order.<br/>

 You must pay 30% of the amount (deposit) for the goods prior to their dispatch to you and within 15 working days following the date of the order.
 You must pay the remaining amount when the goods are delivered to you.
 We accept only bank transfer to our account.
 Payment must be in Euro and the transfer expenses are dependent on you.<br/>

 No delivery will take place unless the deposit payment for the goods has been received.
 Every effort will be made to deliver the goods as soon as possible after your order has been accepted.
 Any delivery date or time specified by us is a best estimate only and we will not be liable for any loss or damage suffered by you through any reasonable or unavoidable delay in delivery.
 Ownership of the goods and the risk for damage to the goods passes to you upon delivery.<br/>

 When you buy goods from any retailer, the goods must be: of satisfactory quality; fit for their purpose; and as described.
 If they do not meet these standards, you may be able to claim a refund, replacement, repair and/or compensation from the retailer.
 If there is a problem with your goods, please let us know. Within 7 days following the date of delivery, you may notify Marvielab of any nonconforming goods,
 defective materials, workmanship, or any shortages in the merchandise delivered.
 You must return the items in question, in their original packaging, complete with any related accessories or instruction booklets,
 together with the original invoice.<br/>

 We shall not be liable to you if we are prevented or delayed in the performance of any of our obligations to you if this is due to any cause beyond
 our reasonable control including (without limitation): an act of God, explosion, flood, fire or accident; war or civil disturbance; strike,
 industrial action or stoppages of work; any form of government intervention; a third party act or omission; failure of our supplier(s);
 failure by you to give us a correct delivery address or notify us of any change of address.<br/>
 We will inform you of any such unforeseen event or of force majeure within seven days of its occurrence.
 Should this interruption continue beyond a period of two weeks, you will be entitled to cancel the order, and a refund of the paid amount will be made.
 <br/>

 <b>PRIVACY POLICY.</b>Please note that pursuant to article 13 of Italian Legislative Decree no. 196 of 2003,
 your personal data have been included in our database and are used only for administrative purposes and to comply with the obligations
 set forth by law, regulations, Community law and civil and tax rules. The processing of personal data will be carried out in compliance
 with the fundamental rights and freedom, as well as the dignity of the interested part, with specific attention to privacy, personal identity and the
 right to personal data protection.<br/>

 *¹The buyer is responsible for all shipping charges including any customs fees that may apply.</p>
 </div>";

 $pdf->writeHTML($html, true, false, true, true, '');
 // ---------------------------------------------------------


 */

//Close and output PDF document
$pdf->Output('order_'.$head[0]['ot']['order_number'].'_'.$head[0]['cl']['company'].'.pdf', 'I');
//
?>