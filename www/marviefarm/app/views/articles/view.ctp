<div class="articles view">
<h2><?php  __('Article');?></h2>
	<dl><?php $i = 0; $class = ' class="altrow"';?>
		<dt<?php if ($i % 2 == 0) echo $class;?>><?php __('Id'); ?></dt>
		<dd<?php if ($i++ % 2 == 0) echo $class;?>>
			<?php echo $article['Article']['id']; ?>
			&nbsp;
		</dd>
		<dt<?php if ($i % 2 == 0) echo $class;?>><?php __('Name'); ?></dt>
		<dd<?php if ($i++ % 2 == 0) echo $class;?>>
			<?php echo $article['Article']['name']; ?>
			&nbsp;
		</dd>
		<dt<?php if ($i % 2 == 0) echo $class;?>><?php __('Description'); ?></dt>
		<dd<?php if ($i++ % 2 == 0) echo $class;?>>
			<?php echo $article['Article']['description']; ?>
			&nbsp;
		</dd>		 
		<dt<?php if ($i % 2 == 0) echo $class;?>><?php __('Modeltypes Sex'); ?></dt>
		<dd<?php if ($i++ % 2 == 0) echo $class;?>>
			<?php echo $this->Html->link($article['ModeltypesSex']['id'], array('controller' => 'modeltypes_sexes', 'action' => 'view', $article['ModeltypesSex']['id'])); ?>
			&nbsp;
		</dd>
		<dt<?php if ($i % 2 == 0) echo $class;?>><?php __('Image'); ?></dt>
		<dd<?php if ($i++ % 2 == 0) echo $class;?>>
			<?php  echo $this->Html->image(array('controller'=>'articles','action'=>'show',$article['Article']['id']),
		array('title'=>'This is a related file to a project', 'width'=>'300px'));
 ?> 
			&nbsp;
		</dd>
	</dl>
</div>
<div class="actions">
	<h3><?php __('Actions'); ?></h3>
	<ul>
		<li><?php echo $this->Html->link(__('Edit Article', true), array('action' => 'edit', $article['Article']['id'])); ?> </li>
		<li><?php echo $this->Html->link(__('Delete Article', true), array('action' => 'delete', $article['Article']['id']), null, sprintf(__('Are you sure you want to delete # %s?', true), $article['Article']['id'])); ?> </li>
		<li><?php echo $this->Html->link(__('List Articles', true), array('action' => 'index')); ?> </li>
		<li><?php echo $this->Html->link(__('New Article', true), array('action' => 'add')); ?> </li>
		<li><?php echo $this->Html->link(__('List Modeltypes Sexes', true), array('controller' => 'modeltypes_sexes', 'action' => 'index')); ?> </li>
		<li><?php echo $this->Html->link(__('New Modeltypes Sex', true), array('controller' => 'modeltypes_sexes', 'action' => 'add')); ?> </li>
		<li><?php echo $this->Html->link(__('List Orderdetails', true), array('controller' => 'orderdetails', 'action' => 'index')); ?> </li>
		<li><?php echo $this->Html->link(__('New Orderdetail', true), array('controller' => 'orderdetails', 'action' => 'add')); ?> </li>
		<li><?php echo $this->Html->link(__('List Fabrics', true), array('controller' => 'fabrics', 'action' => 'index')); ?> </li>
		<li><?php echo $this->Html->link(__('New Fabric', true), array('controller' => 'fabrics', 'action' => 'add')); ?> </li>
		<li><?php echo $this->Html->link(__('List Projects', true), array('controller' => 'projects', 'action' => 'index')); ?> </li>
		<li><?php echo $this->Html->link(__('New Project', true), array('controller' => 'projects', 'action' => 'add')); ?> </li>
	</ul>
</div>


<div class="related">
	<h3><?php __('Related Fabrics');?></h3>
	<?php if (!empty($article['Fabric'])):?>
	<table cellpadding = "0" cellspacing = "0">
	<tr>
		<th><?php __('Id'); ?></th>
		<th><?php __('Code'); ?></th>
		<th><?php __('Description'); ?></th>
		<th><?php __('Price'); ?></th>  
		<th class="actions"><?php __('Actions');?></th>
	</tr>
	<?php
		$i = 0;
		foreach ($article['Fabric'] as $fabric):
			$class = null;
			if ($i++ % 2 == 0) {
				$class = ' class="altrow"';
			}
		?>
		<tr<?php echo $class;?>>
			<td><?php echo $fabric['id'];?></td>
			<td><?php echo $fabric['code'];?></td>
			<td><?php echo $fabric['description'];?></td>
			<td><?php echo $fabric['price'];?></td>  
			<td class="actions">
				<?php echo $this->Html->link(__('View', true), array('controller' => 'fabrics', 'action' => 'view', $fabric['id'])); ?>
				<?php echo $this->Html->link(__('Edit', true), array('controller' => 'fabrics', 'action' => 'edit', $fabric['id'])); ?>
				<?php echo $this->Html->link(__('Delete', true), array('controller' => 'fabrics', 'action' => 'delete', $fabric['id']), null, sprintf(__('Are you sure you want to delete # %s?', true), $fabric['id'])); ?>
			</td>
		</tr>
	<?php endforeach; ?>
	</table>
<?php endif; ?>

	<div class="actions">
		<ul>
			<li><?php echo $this->Html->link(__('New Fabric', true), array('controller' => 'fabrics', 'action' => 'add'));?> </li>
		</ul>
	</div>
</div>
<div class="related">
	<h3><?php __('Related Projects');?></h3>
	<?php if (!empty($article['Project'])):?>
	<table cellpadding = "0" cellspacing = "0">
	<tr>
		<th><?php __('Id'); ?></th>
		<th><?php __('Name'); ?></th>
		<th><?php __('Description'); ?></th>
		<th class="actions"><?php __('Actions');?></th>
	</tr>
	<?php
		$i = 0;
		foreach ($article['Project'] as $project):
			$class = null;
			if ($i++ % 2 == 0) {
				$class = ' class="altrow"';
			}
		?>
		<tr<?php echo $class;?>>
			<td><?php echo $project['id'];?></td>
			<td><?php echo $project['name'];?></td>
			<td><?php echo $project['description'];?></td>
			<td class="actions">
				<?php echo $this->Html->link(__('View', true), array('controller' => 'projects', 'action' => 'view', $project['id'])); ?>
				<?php echo $this->Html->link(__('Edit', true), array('controller' => 'projects', 'action' => 'edit', $project['id'])); ?>
				<?php echo $this->Html->link(__('Delete', true), array('controller' => 'projects', 'action' => 'delete', $project['id']), null, sprintf(__('Are you sure you want to delete # %s?', true), $project['id'])); ?>
			</td>
		</tr>
	<?php endforeach; ?>
	</table>
<?php endif; ?>

	<div class="actions">
		<ul>
			<li><?php echo $this->Html->link(__('New Project', true), array('controller' => 'projects', 'action' => 'add'));?> </li>
		</ul>
	</div>
</div>


<!-- 
<div class="related">
	<h3><?php __('Related Orderdetails');?></h3>
	<?php if (!empty($article['Orderdetail'])):?>
	<table cellpadding = "0" cellspacing = "0">
	<tr> 
		<th><?php __('Orderheader Id'); ?></th> 
		<th><?php __('Fabric Id'); ?></th>
		<th><?php __('Size'); ?></th>
		<th><?php __('Qta'); ?></th>
		<th class="actions"><?php __('Actions');?></th>
	</tr>
	<?php
		$i = 0;
		foreach ($article['Orderdetail'] as $orderdetail):
			$class = null;
			if ($i++ % 2 == 0) {
				$class = ' class="altrow"';
			}
		?>
		<tr<?php echo $class;?>> 
			<td><?php echo $orderdetail['orderheader_id'];?></td> 
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

 -->