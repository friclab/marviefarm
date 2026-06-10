<div class="fabrics view">
<h2><?php  __('Fabric');?></h2>
	<dl><?php $i = 0; $class = ' class="altrow"';?>
		<dt<?php if ($i % 2 == 0) echo $class;?>><?php __('Id'); ?></dt>
		<dd<?php if ($i++ % 2 == 0) echo $class;?>>
			<?php echo $fabric['Fabric']['id']; ?>
			&nbsp;
		</dd>
		<dt<?php if ($i % 2 == 0) echo $class;?>><?php __('Code'); ?></dt>
		<dd<?php if ($i++ % 2 == 0) echo $class;?>>
			<?php echo $fabric['Fabric']['code']; ?>
			&nbsp;
		</dd>
		<dt<?php if ($i % 2 == 0) echo $class;?>><?php __('Description'); ?></dt>
		<dd<?php if ($i++ % 2 == 0) echo $class;?>>
			<?php echo $fabric['Fabric']['description']; ?>
			&nbsp;
		</dd>
		<?php  
	 if($this -> Session -> read("Auth.User.perm")==="admin"){
	 ?>
	<dt<?php if ($i % 2 == 0) echo $class;?>><?php __('Cost'); ?></dt>
		<dd<?php if ($i++ % 2 == 0) echo $class;?>>
			<?php echo $fabric['Fabric']['cost']; ?>
			&nbsp;
		</dd>
	 <?php }?>
		
		<dt<?php if ($i % 2 == 0) echo $class;?>><?php __('Price'); ?></dt>
		<dd<?php if ($i++ % 2 == 0) echo $class;?>>
			<?php echo $fabric['Fabric']['price']; ?>
			&nbsp;
		</dd>
		<dt<?php if ($i % 2 == 0) echo $class;?>><?php __('Fixed composition'); ?></dt>
		<dd<?php if ($i++ % 2 == 0) echo $class;?>>
			<?php echo $this->Html->link($fabric['Fixedcomposition']['code'], array('controller' => 'fixedcompositions', 'action' => 'view', $fabric['Fixedcomposition']['id'])); ?>
			&nbsp;
		</dd>
		<dt<?php if ($i % 2 == 0) echo $class;?>><?php __('Dynamic composition'); ?></dt>
		<dd<?php if ($i++ % 2 == 0) echo $class;?>>
			<?php echo $this->Html->link($fabric['Dynamiccomposition']['code'], array('controller' => 'dynamiccompositions', 'action' => 'view', $fabric['Dynamiccomposition']['id'])); ?>
			&nbsp;
		</dd>
		<dt<?php if ($i % 2 == 0) echo $class;?>><?php __('Article'); ?></dt>
		<dd<?php if ($i++ % 2 == 0) echo $class;?>>
			<?php echo $this->Html->link($fabric['Article']['name'], array('controller' => 'articles', 'action' => 'view', $fabric['Article']['id'])); ?>
			&nbsp;
		</dd>
	</dl>
</div>
<div class="actions">
	<h3><?php __('Actions'); ?></h3>
	<ul>
		<li><?php echo $this->Html->link(__('Edit Fabric', true), array('action' => 'edit', $fabric['Fabric']['id'])); ?> </li>
		<li><?php echo $this->Html->link(__('Delete Fabric', true), array('action' => 'delete', $fabric['Fabric']['id']), null, sprintf(__('Are you sure you want to delete # %s?', true), $fabric['Fabric']['id'])); ?> </li>
		<li><?php echo $this->Html->link(__('List Fabrics', true), array('action' => 'index')); ?> </li>
		<li><?php echo $this->Html->link(__('New Fabric', true), array('action' => 'add')); ?> </li>
		<li><?php echo $this->Html->link(__('List Fixedcompositions', true), array('controller' => 'fixedcompositions', 'action' => 'index')); ?> </li>
		<li><?php echo $this->Html->link(__('New Fixedcomposition', true), array('controller' => 'fixedcompositions', 'action' => 'add')); ?> </li>
		<li><?php echo $this->Html->link(__('List Dynamiccompositions', true), array('controller' => 'dynamiccompositions', 'action' => 'index')); ?> </li>
		<li><?php echo $this->Html->link(__('New Dynamiccomposition', true), array('controller' => 'dynamiccompositions', 'action' => 'add')); ?> </li>
		<li><?php echo $this->Html->link(__('List Orderdetails', true), array('controller' => 'orderdetails', 'action' => 'index')); ?> </li>
		<li><?php echo $this->Html->link(__('New Orderdetail', true), array('controller' => 'orderdetails', 'action' => 'add')); ?> </li>
		<li><?php echo $this->Html->link(__('List Articles', true), array('controller' => 'articles', 'action' => 'index')); ?> </li>
		<li><?php echo $this->Html->link(__('New Article', true), array('controller' => 'articles', 'action' => 'add')); ?> </li>
	</ul>
</div>
<div class="related">
	<h3><?php __('Related Orderdetails');?></h3>
	<?php if (!empty($fabric['Orderdetail'])):?>
	<table cellpadding = "0" cellspacing = "0">
	<tr>
		<th><?php __('Id'); ?></th>
		<th><?php __('Orderheader Id'); ?></th>
		<th><?php __('Article Id'); ?></th>
		<th><?php __('Fabric Id'); ?></th>
		<th><?php __('Modeltypessexessize Id'); ?></th>
		<th><?php __('Qta'); ?></th>
		<th class="actions"><?php __('Actions');?></th>
	</tr>
	<?php
		$i = 0;
		foreach ($fabric['Orderdetail'] as $orderdetail):
			$class = null;
			if ($i++ % 2 == 0) {
				$class = ' class="altrow"';
			}
		?>
		<tr<?php echo $class;?>>
			<td><?php echo $orderdetail['id'];?></td>
			<td><?php echo $orderdetail['orderheader_id'];?></td>
			<td><?php echo $orderdetail['article_id'];?></td>
			<td><?php echo $orderdetail['fabric_id'];?></td>
			<td><?php echo $orderdetail['modeltypessexessize_id'];?></td>
			<td><?php echo $orderdetail['qta'];?></td>
			<td class="actions">
				<?php echo $this->Html->link(__('View', true), array('controller' => 'orderdetails', 'action' => 'view', $orderdetail['id'])); ?>
				<?php echo $this->Html->link(__('Edit', true), array('controller' => 'orderdetails', 'action' => 'edit', $orderdetail['id'])); ?>
				<?php echo $this->Html->link(__('Delete', true), array('controller' => 'orderdetails', 'action' => 'delete', $orderdetail['id']), null, sprintf(__('Are you sure you want to delete # %s?', true), $orderdetail['id'])); ?>
			</td>
		</tr>
	<?php endforeach; ?>
	</table>
<?php endif; ?>

	<div class="actions">
		<ul>
			<li><?php echo $this->Html->link(__('New Orderdetail', true), array('controller' => 'orderdetails', 'action' => 'add'));?> </li>
		</ul>
	</div>
</div>