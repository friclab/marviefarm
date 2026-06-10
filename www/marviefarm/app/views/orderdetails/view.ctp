<div class="orderdetails view">
<h2><?php  __('Orderdetail');?></h2>
	<dl><?php $i = 0; $class = ' class="altrow"';?>
		<dt<?php if ($i % 2 == 0) echo $class;?>><?php __('Id'); ?></dt>
		<dd<?php if ($i++ % 2 == 0) echo $class;?>>
			<?php echo $orderdetail['Orderdetail']['id']; ?>
			&nbsp;
		</dd>
		<dt<?php if ($i % 2 == 0) echo $class;?>><?php __('Orderheader'); ?></dt>
		<dd<?php if ($i++ % 2 == 0) echo $class;?>>
			<?php echo $this->Html->link($orderdetail['Orderheader']['order_number'], array('controller' => 'orderheaders', 'action' => 'view', $orderdetail['Orderheader']['id'])); ?>
			&nbsp;
		</dd>
		<dt<?php if ($i % 2 == 0) echo $class;?>><?php __('Article'); ?></dt>
		<dd<?php if ($i++ % 2 == 0) echo $class;?>>
			<?php echo $this->Html->link($orderdetail['Article']['name'], array('controller' => 'articles', 'action' => 'view', $orderdetail['Article']['id'])); ?>
			&nbsp;
		</dd>
		<dt<?php if ($i % 2 == 0) echo $class;?>><?php __('Fabric'); ?></dt>
		<dd<?php if ($i++ % 2 == 0) echo $class;?>>
			<?php echo $this->Html->link($orderdetail['Fabric']['code'], array('controller' => 'fabrics', 'action' => 'view', $orderdetail['Fabric']['id'])); ?>
			&nbsp;
		</dd>
		<dt<?php if ($i % 2 == 0) echo $class;?>><?php __('Modeltypessexes Size'); ?></dt>
		<dd<?php if ($i++ % 2 == 0) echo $class;?>>
			<?php echo $this->Html->link($orderdetail['ModeltypessexesSize']['id'], array('controller' => 'modeltypessexes_sizes', 'action' => 'view', $orderdetail['ModeltypessexesSize']['id'])); ?>
			&nbsp;
		</dd>
		<dt<?php if ($i % 2 == 0) echo $class;?>><?php __('Qta'); ?></dt>
		<dd<?php if ($i++ % 2 == 0) echo $class;?>>
			<?php echo $orderdetail['Orderdetail']['qta']; ?>
			&nbsp;
		</dd>
	</dl>
</div>
<div class="actions">
	<h3><?php __('Actions'); ?></h3>
	<ul>
		<li><?php echo $this->Html->link(__('Edit Orderdetail', true), array('action' => 'edit', $orderdetail['Orderdetail']['id'])); ?> </li>
		<li><?php echo $this->Html->link(__('Delete Orderdetail', true), array('action' => 'delete', $orderdetail['Orderdetail']['id']), null, sprintf(__('Are you sure you want to delete # %s?', true), $orderdetail['Orderdetail']['id'])); ?> </li>
		<li><?php echo $this->Html->link(__('List Orderdetails', true), array('action' => 'index')); ?> </li>
		<li><?php echo $this->Html->link(__('New Orderdetail', true), array('action' => 'add')); ?> </li>
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
