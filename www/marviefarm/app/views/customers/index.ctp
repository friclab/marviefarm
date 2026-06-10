<div class="customers index">
	<h2><?php __('Customers');?></h2>
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
			<th><?php echo $this->Paginator->sort('vat_applied');?></th>
			<th class="actions"><?php __('Actions');?></th>
	</tr>
	<?php
	$i = 0;
	foreach ($customers as $customer):
		$class = null;
		if ($i++ % 2 == 0) {
			$class = ' class="altrow"';
		}
	?>
	<tr<?php echo $class;?>>
		<td><?php echo $customer['Customer']['id']; ?>&nbsp;</td>
		<td><?php echo $customer['Customer']['name']; ?>&nbsp;</td>
		<td><?php echo $customer['Customer']['surname']; ?>&nbsp;</td>
		<td><?php echo $customer['Customer']['company']; ?>&nbsp;</td>
		<td><?php echo $customer['Customer']['vat']; ?>&nbsp;</td>
		<td><?php echo $customer['Customer']['fiscal_code']; ?>&nbsp;</td>
		<td><?php echo $customer['Customer']['email']; ?>&nbsp;</td>
		<td><?php echo $customer['Customer']['phone1']; ?>&nbsp;</td>
		<td><?php echo $customer['Customer']['phone2']; ?>&nbsp;</td>
		<td><?php echo $customer['Customer']['fax']; ?>&nbsp;</td>
		<td><?php echo $customer['Customer']['mobile']; ?>&nbsp;</td>
		<td><?php echo $customer['Customer']['address']; ?>&nbsp;</td>
		<td><?php echo $customer['Customer']['zip_code']; ?>&nbsp;</td>
		<td><?php echo $customer['Customer']['city']; ?>&nbsp;</td>
		<td><?php echo $customer['Customer']['district']; ?>&nbsp;</td>
		<td><?php echo $customer['Customer']['country']; ?>&nbsp;</td>
		<td><?php echo $customer['Customer']['vat_applied']; ?>&nbsp;</td>
		<td class="actions">
			<?php echo $this->Html->link(__('View', true), array('action' => 'view', $customer['Customer']['id'])); ?>
			<?php echo $this->Html->link(__('Edit', true), array('action' => 'edit', $customer['Customer']['id'])); ?>
			<?php echo $this->Html->link(__('Delete', true), array('action' => 'delete', $customer['Customer']['id']), null, sprintf(__('Are you sure you want to delete # %s?', true), $customer['Customer']['id'])); ?>
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
		<li><?php echo $this->Html->link(__('New Customer', true), array('action' => 'add')); ?></li>
		<li><?php echo $this->Html->link(__('List Orderheaders', true), array('controller' => 'orderheaders', 'action' => 'index')); ?> </li>
		<li><?php echo $this->Html->link(__('New Orderheader', true), array('controller' => 'orderheaders', 'action' => 'add')); ?> </li>
	</ul>
</div>