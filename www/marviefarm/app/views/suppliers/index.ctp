<div class="suppliers index">
	<h2><?php __('Suppliers');?></h2>
	<table cellpadding="0" cellspacing="0">
	<tr>
			<th><?php echo $this->Paginator->sort('id');?></th>
			<th><?php echo $this->Paginator->sort('name');?></th>
			<th><?php echo $this->Paginator->sort('surname');?></th>
			<th><?php echo $this->Paginator->sort('company');?></th>
			<th><?php echo $this->Paginator->sort('vat');?></th>
			<th><?php echo $this->Paginator->sort('fiscal_code');?></th>
			<th><?php echo $this->Paginator->sort('email');?></th>
			<th><?php echo $this->Paginator->sort('phone1');?></th>
			<th><?php echo $this->Paginator->sort('phone2');?></th>
			<th><?php echo $this->Paginator->sort('fax');?></th>
			<th><?php echo $this->Paginator->sort('mobile');?></th>
			<th><?php echo $this->Paginator->sort('address');?></th>
			<th><?php echo $this->Paginator->sort('zip_code');?></th>
			<th><?php echo $this->Paginator->sort('city');?></th>
			<th><?php echo $this->Paginator->sort('district');?></th>
			<th><?php echo $this->Paginator->sort('country');?></th>
			<th class="actions"><?php __('Actions');?></th>
	</tr>
	<?php
	$i = 0;
	foreach ($suppliers as $supplier):
		$class = null;
		if ($i++ % 2 == 0) {
			$class = ' class="altrow"';
		}
	?>
	<tr<?php echo $class;?>>
		<td><?php echo $supplier['Supplier']['id']; ?>&nbsp;</td>
		<td><?php echo $supplier['Supplier']['name']; ?>&nbsp;</td>
		<td><?php echo $supplier['Supplier']['surname']; ?>&nbsp;</td>
		<td><?php echo $supplier['Supplier']['company']; ?>&nbsp;</td>
		<td><?php echo $supplier['Supplier']['vat']; ?>&nbsp;</td>
		<td><?php echo $supplier['Supplier']['fiscal_code']; ?>&nbsp;</td>
		<td><?php echo $supplier['Supplier']['email']; ?>&nbsp;</td>
		<td><?php echo $supplier['Supplier']['phone1']; ?>&nbsp;</td>
		<td><?php echo $supplier['Supplier']['phone2']; ?>&nbsp;</td>
		<td><?php echo $supplier['Supplier']['fax']; ?>&nbsp;</td>
		<td><?php echo $supplier['Supplier']['mobile']; ?>&nbsp;</td>
		<td><?php echo $supplier['Supplier']['address']; ?>&nbsp;</td>
		<td><?php echo $supplier['Supplier']['zip_code']; ?>&nbsp;</td>
		<td><?php echo $supplier['Supplier']['city']; ?>&nbsp;</td>
		<td><?php echo $supplier['Supplier']['district']; ?>&nbsp;</td>
		<td><?php echo $supplier['Supplier']['country']; ?>&nbsp;</td>
		<td class="actions">
			<?php echo $this->Html->link(__('View', true), array('action' => 'view', $supplier['Supplier']['id'])); ?>
			<?php echo $this->Html->link(__('Edit', true), array('action' => 'edit', $supplier['Supplier']['id'])); ?>
			<?php echo $this->Html->link(__('Delete', true), array('action' => 'delete', $supplier['Supplier']['id']), null, sprintf(__('Are you sure you want to delete # %s?', true), $supplier['Supplier']['id'])); ?>
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
		<li><?php echo $this->Html->link(__('New Supplier', true), array('action' => 'add')); ?></li>
		<li><?php echo $this->Html->link(__('List Materials', true), array('controller' => 'materials', 'action' => 'index')); ?> </li>
		<li><?php echo $this->Html->link(__('New Material', true), array('controller' => 'materials', 'action' => 'add')); ?> </li>
	</ul>
</div>