<div class="modeltypessexesSizes form">
<?php echo $this->Form->create('ModeltypessexesSize');?>
	<fieldset>
 		<legend><?php __('Edit Modeltypessexes Size'); ?></legend>
	<?php
		echo $this->Form->input('id');
		echo $this->Form->input('modeltypessex_id',array('options'=>$modeltypesSexes));
		echo $this->Form->input('size_id');
	?>
	</fieldset>
<?php echo $this->Form->end(__('Submit', true));?>
</div>
<div class="actions">
	<h3><?php __('Actions'); ?></h3>
	<ul>

		<li><?php echo $this->Html->link(__('Delete', true), array('action' => 'delete', $this->Form->value('ModeltypessexesSize.id')), null, sprintf(__('Are you sure you want to delete # %s?', true), $this->Form->value('ModeltypessexesSize.id'))); ?></li>
		<li><?php echo $this->Html->link(__('List Modeltypessexes Sizes', true), array('action' => 'index'));?></li>
		<li><?php echo $this->Html->link(__('List Sizes', true), array('controller' => 'sizes', 'action' => 'index')); ?> </li>
		<li><?php echo $this->Html->link(__('New Size', true), array('controller' => 'sizes', 'action' => 'add')); ?> </li>
		<li><?php echo $this->Html->link(__('List Modeltypes Sexes', true), array('controller' => 'modeltypes_sexes', 'action' => 'index')); ?> </li>
		<li><?php echo $this->Html->link(__('New Modeltypes Sex', true), array('controller' => 'modeltypes_sexes', 'action' => 'add')); ?> </li>
	</ul>
</div>