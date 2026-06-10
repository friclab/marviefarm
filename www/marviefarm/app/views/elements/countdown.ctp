<div>
	<ul>
		<li>LEFT</li>
		<?php
		$data = $this->requestAction('countdown/index');
		$initialQty= $this->requestAction('countdown/initialQty');

		foreach($initialQty as $mat=>$ini){
				
			if(!isset($data[$mat])){
				$data[$mat]=$ini;
			}
				
			$percent = round($data[$mat]/$ini*100);
			$color='green';
			$colorTxt='black';
			if($percent<0){
				$color='red';
				$colorTxt='red';
				$percent=0;
			}
			if($percent<25){
				$color='red';
			}else if($percent<50){
				$color='orange';
			}else if($percent<75){
				$color='yellow';
			}
			?>
		<li><div style="width: <?php echo $percent?>;  background-color: <?php echo $color?>; color:<?php echo $colorTxt?> ">
				<b><?php
				echo $mat.' ('.$data[$mat].'/'.$ini.' m)';
				?> </b>
			</div></li>
		<?
		}
		?>
	</ul>
</div>