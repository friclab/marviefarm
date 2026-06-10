<div class="dynamiccompositionsMaterials form">
<?php echo $this->Form->create('DynamiccompositionsMaterial');?>
	<fieldset>
 		<legend><?php __('Add Dynamiccompositions Material'); ?></legend>
	<?php
		echo $this->Form->input('material_id');
		echo $this->Form->input('dynamiccomposition_id');
		echo $this->Form->input('qta');
	?>
	</fieldset>
<?php echo $this->Form->end(__('Submit', true));?>
</div>
<div class="actions">
	<h3><?php __('Actions'); ?></h3>
	<ul>

		<li><?php echo $this->Html->link(__('List Dynamiccompositions Materials', true), array('action' => 'index'));?></li>
	</ul>
</div>