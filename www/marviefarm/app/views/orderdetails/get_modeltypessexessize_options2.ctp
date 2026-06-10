<table>
	<tr>
		<td>Size</td>
		<td>Qty</td>
	</tr>
	<?php foreach($options AS $k=>$v) : ?>
	<tr>
		<td><?php echo $v; ?></td>
		<td><input id="qta_<?php echo $k; ?>"  name="qta_<?php echo $k; ?>"value="0"/></td>
	</tr>
	<?php endforeach; ?>
</table>
