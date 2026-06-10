<div class="materialtypes form">
<?php echo $this->Form->create('Materialtype');?>
	<fieldset>
 		<legend><?php __('Edit Materialtype'); ?></legend>
	<?php
		echo $this->Form->input('id');
		echo $this->Form->input('code');
		echo $this->Form->input('description');
	?>
	</fieldset>
<?php echo $this->Form->end(__('Submit', true));?>
</div>
<div class="actions">
	<h3><?php __('Actions'); ?></h3>
	<ul>

		<li><?php echo $this->Html->link(__('Delete', true), array('action' => 'delete', $this->Form->value('Materialtype.id')), null, sprintf(__('Are you sure you want to delete # %s?', true), $this->Form->value('Materialtype.id'))); ?></li>
		<li><?php echo $this->Html->link(__('List Materialtypes', true), array('action' => 'index'));?></li>
		<li><?php echo $this->Html->link(__('List Materials', true), array('controller' => 'materials', 'action' => 'index')); ?> </li>
		<li><?php echo $this->Html->link(__('New Material', true), array('controller' => 'materials', 'action' => 'add')); ?> </li>
	</ul>
</div>