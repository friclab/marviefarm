<div class="orderdetails form">
<?php echo $this->Form->create('Orderdetail');?>
	<fieldset>
 		<legend><?php __('Edit Orderdetail'); ?></legend>
	<?php
		echo $this->Form->input('id');
		echo $this->Form->input('orderheader_id');
		echo $this->Form->input('article_id');
		echo $this->Form->input('fabric_id');
		echo $this->Form->input('modeltypessexessize_id');
		echo $this->Form->input('qta');
		echo $this->Form->input('note');
		
		
$this->Js->get('#OrderdetailArticleId')->event('change',
$this->Js->request(array('controller'=>'orderdetails','action' => 'getModeltypessexessizeOptions'),
array(
							'method' => 'POST',
							'type'=>'json',
							'async' => true,
							'update' => '#OrderdetailModeltypessexessizeId',
							'dataExpression'=>true,
							'data'=>$this->Js->serializeForm(array('isForm' => true, 'inline' => true))
)
)
); 

$this->Js->get('#OrderdetailArticleId')->event('change',
$this->Js->request(array('controller'=>'orderdetails','action' => 'getFabricOptions'),
array(
							'method' => 'POST',
							'type'=>'json',
							'async' => true,
							'update' => '#OrderdetailFabricId',
							'dataExpression'=>true,
							'data'=>$this->Js->serializeForm(array('isForm' => true, 'inline' => true))
)
)
);
 
$this->Js->get('#OrderdetailArticleId')->event('change',
$this->Js->request(array('controller'=>'orderdetails','action' => 'getArticleInfo'),
array(
							'method' => 'POST',
							'type'=>'json',
							'async' => true,
							'update' => '#articleInfo',
							'dataExpression'=>true,
							'data'=>$this->Js->serializeForm(array('isForm' => true, 'inline' => true))
)
)
);
		
		
	?>
	</fieldset>
<?php echo $this->Form->end(__('Submit', true));?>
</div>
<div class="actions">
	<h3><?php __('Actions'); ?></h3>
	<ul>

		<li><?php echo $this->Html->link(__('Delete', true), array('action' => 'delete', $this->Form->value('Orderdetail.id')), null, sprintf(__('Are you sure you want to delete # %s?', true), $this->Form->value('Orderdetail.id'))); ?></li>
		 
	</ul>
</div>

<script type="text/javascript">
<!--
//$(document).ready( function (event) 
	//	{$.ajax({async:true, data:$("#OrderdetailArticleId").serialize(), dataType:"html", success:function (data, textStatus) {$("#articleInfo").html(data);}, type:"POST", url:"\/marviefarm\/orderdetails\/getArticleInfo"});
		//	return false;});
//$(document).ready( function (event) {$.ajax({async:true, data:$("#OrderdetailArticleId").serialize(), dataType:"html", success:function (data, textStatus) {$("#OrderdetailModeltypessexessizeId").html(data);}, type:"POST", url:"\/marviefarm\/orderdetails\/getModeltypessexessizeOptions"});
//return false;});
//$(document).ready(  function (event) {$.ajax({async:true, data:$("#OrderdetailArticleId").serialize(), dataType:"html", success:function (data, textStatus) {$("#OrderdetailFabricId").html(data);}, type:"POST", url:"\/marviefarm\/orderdetails\/getFabricOptions"});
//return false;});

//-->
</script> 