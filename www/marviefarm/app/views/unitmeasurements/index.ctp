<div class="unitmeasurements index">
	<h2><?php __('Unitmeasurements');?></h2>
	<table cellpadding="0" cellspacing="0">
	<tr>
			<th><?php echo $this->Paginator->sort('id');?></th>
			<th><?php echo $this->Paginator->sort('code');?></th>
			<th><?php echo $this->Paginator->sort('description');?></th>
			<th class="actions"><?php __('Actions');?></th>
	</tr>
	<?php
	$i = 0;
	foreach ($unitmeasurements as $unitmeasurement):
		$class = null;
		if ($i++ % 2 == 0) {
			$class = ' class="altrow"';
		}
	?>
	<tr<?php echo $class;?>>
		<td><?php echo $unitmeasurement['Unitmeasurement']['id']; ?>&nbsp;</td>
		<td><?php echo $unitmeasurement['Unitmeasurement']['code']; ?>&nbsp;</td>
		<td><?php echo $unitmeasurement['Unitmeasurement']['description']; ?>&nbsp;</td>
		<td class="actions">
			<?php echo $this->Html->link(__('View', true), array('action' => 'view', $unitmeasurement['Unitmeasurement']['id'])); ?>
			<?php echo $this->Html->link(__('Edit', true), array('action' => 'edit', $unitmeasurement['Unitmeasurement']['id'])); ?>
			<?php echo $this->Html->link(__('Delete', true), array('action' => 'delete', $unitmeasurement['Unitmeasurement']['id']), null, sprintf(__('Are you sure you want to delete # %s?', true), $unitmeasurement['Unitmeasurement']['id'])); ?>
		</td>
	</tr>
<?php endforeach; ?>
	</table>
	<p>
	<?php
	echo $this->Paginator->counter(array(
	'format' => __('Page %page% of %pages%, showing %current% records out of %count% total, starting on record %start%, ending on %end%', true)
	));
	?>	</p>

	<div class="paging">
		<?php echo $this->Paginator->prev('<< ' . __('previous', true), array(), null, array('class'=>'disabled'));?>
	 | 	<?php echo $this->Paginator->numbers();?>
 |
		<?php echo $this->Paginator->next(__('next', true) . ' >>', array(), null, array('class' => 'disabled'));?>
	</div>
</div>
<div class="actions">
	<h3><?php __('Actions'); ?></h3>
	<ul>
		<li><?php echo $this->Html->link(__('New Unitmeasurement', true), array('action' => 'add')); ?></li>
		<li><?php echo $this->Html->link(__('List Materials', true), array('controller' => 'materials', 'action' => 'index')); ?> </li>
		<li><?php echo $this->Html->link(__('New Material', true), array('controller' => 'materials', 'action' => 'add')); ?> </li>
	</ul>
</div>