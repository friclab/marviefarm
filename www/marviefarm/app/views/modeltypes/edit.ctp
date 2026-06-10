<div class="modeltypes form">
<?php echo $this->Form->create('Modeltype');?>
	<fieldset>
 		<legend><?php __('Edit Modeltype'); ?></legend>
	<?php
		echo $this->Form->input('id');
		echo $this->Form->input('code');
		echo $this->Form->input('description');
		echo $this->Form->input('Sex');
	?>
	</fieldset>
<?php echo $this->Form->end(__('Submit', true));?>
</div>
<div class="actions">
	<h3><?php __('Actions'); ?></h3>
	<ul>

		<li><?php echo $this->Html->link(__('Delete', true), array('action' => 'delete', $this->Form->value('Modeltype.id')), null, sprintf(__('Are you sure you want to delete # %s?', true), $this->Form->value('Modeltype.id'))); ?></li>
		<li><?php echo $this->Html->link(__('List Modeltypes', true), array('action' => 'index'));?></li>
		<li><?php echo $this->Html->link(__('List Sexes', true), array('controller' => 'sexes', 'action' => 'index')); ?> </li>
		<li><?php echo $this->Html->link(__('New Sex', true), array('controller' => 'sexes', 'action' => 'add')); ?> </li>
	</ul>
</div>