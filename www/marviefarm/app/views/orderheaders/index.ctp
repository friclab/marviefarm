<div class="orderheaders index">
	<h2><?php __('Orderheaders');?></h2>
	<table cellpadding="0" cellspacing="0">
	<tr>
			<th><?php echo $this->Paginator->sort('id');?></th>
			<th><?php echo $this->Paginator->sort('order_number');?></th>
			<th><?php echo $this->Paginator->sort('description');?></th>
			<th><?php echo $this->Paginator->sort('customer_id');?></th>
			<th><?php echo $this->Paginator->sort('collection_id');?></th>
			<th><?php echo $this->Paginator->sort('date');?></th>
			<th class="actions"><?php __('Actions');?></th>
	</tr>
	<?php
	$i = 0;
	foreach ($orderheaders as $orderheader):
		$class = null;
		if ($i++ % 2 == 0) {
			$class = ' class="altrow"';
		}
	?>
	<tr<?php echo $class;?>>
		<td><?php echo $orderheader['Orderheader']['id']; ?>&nbsp;</td>
		<td><?php echo $orderheader['Orderheader']['order_number']; ?>&nbsp;</td>
		<td><?php echo $orderheader['Orderheader']['description']; ?>&nbsp;</td>
		<td>
			<?php echo $this->Html->link($orderheader['Customer']['company'].' - '.$orderheader['Customer']['name'].' '.$orderheader['Customer']['surname'], array('controller' => 'customers', 'action' => 'view', $orderheader['Customer']['id'])); ?>
		</td>
		<td>
			<?php echo $this->Html->link($orderheader['Collection']['name'], array('controller' => 'collections', 'action' => 'view', $orderheader['Collection']['id'])); ?>
		</td>
		<td><?php echo $orderheader['Orderheader']['date']; ?>&nbsp;</td>
		<td class="actions">
			<?php echo $this->Html->link(__('View', true), array('action' => 'view', $orderheader['Orderheader']['id'])); ?>
			<?php echo $this->Html->link(__('Edit', true), array('action' => 'edit', $orderheader['Orderheader']['id'])); ?>
			<?php echo $this->Html->link(__('Delete', true), array('action' => 'delete', $orderheader['Orderheader']['id']), null, sprintf(__('Are you sure you want to delete # %s?', true), $orderheader['Orderheader']['id'])); ?>
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
		<li><?php echo $this->Html->link(__('New Orderheader', true), array('action' => 'add')); ?></li>
		<li><?php echo $this->Html->link(__('List Customers', true), array('controller' => 'customers', 'action' => 'index')); ?> </li>
		<li><?php echo $this->Html->link(__('New Customer', true), array('controller' => 'customers', 'action' => 'add')); ?> </li>
		<li><?php echo $this->Html->link(__('List Collections', true), array('controller' => 'collections', 'action' => 'index')); ?> </li>
		<li><?php echo $this->Html->link(__('New Collection', true), array('controller' => 'collections', 'action' => 'add')); ?> </li>
		<li><?php echo $this->Html->link(__('List Orderdetails', true), array('controller' => 'orderdetails', 'action' => 'index')); ?> </li>
		<li><?php echo $this->Html->link(__('New Orderdetail', true), array('controller' => 'orderdetails', 'action' => 'add')); ?> </li>
	</ul>
	    <?php //echo $this->element('countdown'); ?>
	
</div>