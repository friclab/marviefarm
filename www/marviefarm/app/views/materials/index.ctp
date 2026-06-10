<div class="materials index">
	<h2><?php __('Materials');?></h2>
	<table cellpadding="0" cellspacing="0">
	<tr>
			<th><?php echo $this->Paginator->sort('id');?></th>
			<th><?php echo $this->Paginator->sort('code');?></th>
			<th><?php echo $this->Paginator->sort('description');?></th>
			<th><?php echo $this->Paginator->sort('supplier_id');?></th>
			<th><?php echo $this->Paginator->sort('supplier_code');?></th>
			<th><?php echo $this->Paginator->sort('unitmeasurement_id');?></th>
			<th><?php echo $this->Paginator->sort('price');?></th>
			<th class="actions"><?php __('Actions');?></th>
	</tr>
	<?php
	$i = 0;
	foreach ($materials as $material):
		$class = null;
		if ($i++ % 2 == 0) {
			$class = ' class="altrow"';
		}
	?>
	<tr<?php echo $class;?>>
		<td><?php echo $material['Material']['id']; ?>&nbsp;</td>
		<td><?php echo $material['Material']['code']; ?>&nbsp;</td>
		<td><?php echo $material['Material']['description']; ?>&nbsp;</td>
		<td>
			<?php echo $this->Html->link($material['Supplier']['company'], array('controller' => 'suppliers', 'action' => 'view', $material['Supplier']['id'])); ?>
		</td>
		<td><?php echo $material['Material']['supplier_code']; ?>&nbsp;</td>
		<td>
			<?php echo $this->Html->link($material['Unitmeasurement']['code'], array('controller' => 'unitmeasurements', 'action' => 'view', $material['Unitmeasurement']['id'])); ?>
		</td>
		<td><?php echo $material['Material']['price']; ?>&nbsp;</td>
		<td class="actions">
			<?php echo $this->Html->link(__('View', true), array('action' => 'view', $material['Material']['id'])); ?>
			<?php echo $this->Html->link(__('Edit', true), array('action' => 'edit', $material['Material']['id'])); ?>
			<?php echo $this->Html->link(__('Delete', true), array('action' => 'delete', $material['Material']['id']), null, sprintf(__('Are you sure you want to delete # %s?', true), $material['Material']['id'])); ?>
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
		<li><?php echo $this->Html->link(__('New Material', true), array('action' => 'add')); ?></li>
		<li><?php echo $this->Html->link(__('List Suppliers', true), array('controller' => 'suppliers', 'action' => 'index')); ?> </li>
		<li><?php echo $this->Html->link(__('New Supplier', true), array('controller' => 'suppliers', 'action' => 'add')); ?> </li>
		<li><?php echo $this->Html->link(__('List Unitmeasurements', true), array('controller' => 'unitmeasurements', 'action' => 'index')); ?> </li>
		<li><?php echo $this->Html->link(__('New Unitmeasurement', true), array('controller' => 'unitmeasurements', 'action' => 'add')); ?> </li>
		<li><?php echo $this->Html->link(__('List Materialtypes', true), array('controller' => 'materialtypes', 'action' => 'index')); ?> </li>
		<li><?php echo $this->Html->link(__('New Materialtype', true), array('controller' => 'materialtypes', 'action' => 'add')); ?> </li>
		<li><?php echo $this->Html->link(__('List Dynamiccompositions', true), array('controller' => 'dynamiccompositions', 'action' => 'index')); ?> </li>
		<li><?php echo $this->Html->link(__('New Dynamiccomposition', true), array('controller' => 'dynamiccompositions', 'action' => 'add')); ?> </li>
		<li><?php echo $this->Html->link(__('List Fixedcompositions', true), array('controller' => 'fixedcompositions', 'action' => 'index')); ?> </li>
		<li><?php echo $this->Html->link(__('New Fixedcomposition', true), array('controller' => 'fixedcompositions', 'action' => 'add')); ?> </li>
	</ul>
</div>