<div class="fixedcompositionsMaterials form">
<?php echo $this->Form->create('FixedcompositionsMaterial');?>
	<fieldset>
 		<legend><?php __('Edit Fixedcompositions Material'); ?></legend>
	<?php
		echo $this->Form->input('id');
		echo $this->Form->input('fixedcomposition_id');
		echo $this->Form->input('material_id');
		echo $this->Form->input('qta');
	?>
	</fieldset>
<?php echo $this->Form->end(__('Submit', true));?>
</div>
<div class="actions">
	<h3><?php __('Actions'); ?></h3>
	<ul>

		<li><?php echo $this->Html->link(__('Delete', true), array('action' => 'delete', $this->Form->value('FixedcompositionsMaterial.id')), null, sprintf(__('Are you sure you want to delete # %s?', true), $this->Form->value('FixedcompositionsMaterial.id'))); ?></li>
		<li><?php echo $this->Html->link(__('List Fixedcompositions Materials', true), array('action' => 'index'));?></li>
	</ul>
</div>