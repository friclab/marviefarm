<div class="orderdetails index">
	<h2><?php __('Orderdetails');?></h2>
	<table cellpadding="0" cellspacing="0">
	<tr>
			<th><?php echo $this->Paginator->sort('id');?></th>
			<th><?php echo $this->Paginator->sort('orderheader_id');?></th>
			<th><?php echo $this->Paginator->sort('article_id');?></th>
			<th><?php echo $this->Paginator->sort('fabric_id');?></th>
			<th><?php echo $this->Paginator->sort('modeltypessexessize_id');?></th>
			<th><?php echo $this->Paginator->sort('qta');?></th>
			<th class="actions"><?php __('Actions');?></th>
	</tr>
	<?php
	$i = 0;
	foreach ($orderdetails as $orderdetail):
		$class = null;
		if ($i++ % 2 == 0) {
			$class = ' class="altrow"';
		}
	?>
	<tr<?php echo $class;?>>
		<td><?php echo $orderdetail['Orderdetail']['id']; ?>&nbsp;</td>
		<td>
			<?php echo $this->Html->link($orderdetail['Orderheader']['order_number'], array('controller' => 'orderheaders', 'action' => 'view', $orderdetail['Orderheader']['id'])); ?>
		</td>
		<td>
			<?php echo $this->Html->link($orderdetail['Article']['name'], array('controller' => 'articles', 'action' => 'view', $orderdetail['Article']['id'])); ?>
		</td>
		<td>
			<?php echo $this->Html->link($orderdetail['Fabric']['code'], array('controller' => 'fabrics', 'action' => 'view', $orderdetail['Fabric']['id'])); ?>
		</td>
		<td>
			<?php echo $this->Html->link($orderdetail['ModeltypessexesSize']['id'], array('controller' => 'modeltypessexes_sizes', 'action' => 'view', $orderdetail['ModeltypessexesSize']['id'])); ?>
		</td>
		<td><?php echo $orderdetail['Orderdetail']['qta']; ?>&nbsp;</td>
		<td class="actions">
			<?php echo $this->Html->link(__('View', true), array('action' => 'view', $orderdetail['Orderdetail']['id'])); ?>
			<?php echo $this->Html->link(__('Edit', true), array('action' => 'edit', $orderdetail['Orderdetail']['id'])); ?>
			<?php echo $this->Html->link(__('Delete', true), array('action' => 'delete', $orderdetail['Orderdetail']['id']), null, sprintf(__('Are you sure you want to delete # %s?', true), $orderdetail['Orderdetail']['id'])); ?>
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
		<li><?php echo $this->Html->link(__('New Orderdetail', true), array('action' => 'add')); ?></li>
		<li><?php echo $this->Html->link(__('List Orderheaders', true), array('controller' => 'orderheaders', 'action' => 'index')); ?> </li>
		<li><?php echo $this->Html->link(__('New Orderheader', true), array('controller' => 'orderheaders', 'action' => 'add')); ?> </li>
		<li><?php echo $this->Html->link(__('List Articles', true), array('controller' => 'articles', 'action' => 'index')); ?> </li>
		<li><?php echo $this->Html->link(__('New Article', true), array('controller' => 'articles', 'action' => 'add')); ?> </li>
		<li><?php echo $this->Html->link(__('List Fabrics', true), array('controller' => 'fabrics', 'action' => 'index')); ?> </li>
		<li><?php echo $this->Html->link(__('New Fabric', true), array('controller' => 'fabrics', 'action' => 'add')); ?> </li>
		<li><?php echo $this->Html->link(__('List Modeltypessexes Sizes', true), array('controller' => 'modeltypessexes_sizes', 'action' => 'index')); ?> </li>
		<li><?php echo $this->Html->link(__('New Modeltypessexes Size', true), array('controller' => 'modeltypessexes_sizes', 'action' => 'add')); ?> </li>
	</ul>
</div>