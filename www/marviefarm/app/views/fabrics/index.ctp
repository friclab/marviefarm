<div class="fabrics index">
	<h2><?php __('Fabrics');?></h2>
	<table cellpadding="0" cellspacing="0">
	<tr> 
	<th><?php echo $this->Paginator->sort('article_id');?></th>
			<th><?php echo $this->Paginator->sort('code');?></th>
			<th><?php echo $this->Paginator->sort('description');?></th>
			<?php  
	 if($this -> Session -> read("Auth.User.perm")==="admin"){
	 ?>
	<th><?php echo $this->Paginator->sort('cost');?></th>
	 <?php }?>
			<th><?php echo $this->Paginator->sort('price');?></th>
			<th><?php echo $this->Paginator->sort('fixedcomposition_id');?></th>
			<th><?php echo $this->Paginator->sort('dynamiccomposition_id');?></th>
			<th class="actions"><?php __('Actions');?></th>
	</tr>
	<?php
	$i = 0;
	foreach ($fabrics as $fabric):
		$class = null;
		if ($i++ % 2 == 0) {
			$class = ' class="altrow"';
		}
	?>
	<tr<?php echo $class;?>> 
	<td><?php echo $this->Html->link($fabric['Article']['name'], array('controller' => 'articles', 'action' => 'view', $fabric['Article']['id'])); ?>
	&nbsp;</td>
		<td><?php echo $fabric['Fabric']['code']; ?>&nbsp;</td>
		<td><?php echo $fabric['Fabric']['description']; ?>&nbsp;</td>
		
		<?php  
	 if($this -> Session -> read("Auth.User.perm")==="admin"){
	 ?>
	<td><?php echo $fabric['Fabric']['cost']; ?>&nbsp;</td>
	 <?php }?>
	 <td><?php echo $fabric['Fabric']['price']; ?>&nbsp;</td>
		<td>
			<?php echo $this->Html->link($fabric['Fixedcomposition']['code'], array('controller' => 'fixedcompositions', 'action' => 'view', $fabric['Fixedcomposition']['id'])); ?>
		</td>
		<td>
			<?php echo $this->Html->link($fabric['Dynamiccomposition']['code'], array('controller' => 'dynamiccompositions', 'action' => 'view', $fabric['Dynamiccomposition']['id'])); ?>
		</td>
		<td class="actions">
			<?php echo $this->Html->link(__('View', true), array('action' => 'view', $fabric['Fabric']['id'])); ?>
			<?php echo $this->Html->link(__('Edit', true), array('action' => 'edit', $fabric['Fabric']['id'])); ?>
			<?php echo $this->Html->link(__('Delete', true), array('action' => 'delete', $fabric['Fabric']['id']), null, sprintf(__('Are you sure you want to delete # %s?', true), $fabric['Fabric']['id'])); ?>
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
	<?php  
	 if($this -> Session -> read("Auth.User.perm")==="admin"){
	 ?>
	 <li><?php echo $this->Html->link(__('Calculate costs', true), array('action' => 'calculateCost')); ?></li>
	 <li><?php echo $this->Html->link(__('Articles list', true), array('action' => 'articlesList')); ?></li>
	 <?php }?>
		<li><?php echo $this->Html->link(__('New FixComp - Material', true), array('controller' => 'fixedcompositions_materials','action' => 'add')); ?></li>
		<li><?php echo $this->Html->link(__('New DynComp - Material', true), array('controller' => 'dynamiccompositions_materials','action' => 'add')); ?></li>
		<li><?php echo $this->Html->link(__('List FixComp - Material', true), array('controller' => 'fixedcompositions_materials','action' => 'index')); ?></li>
		<li><?php echo $this->Html->link(__('List DynComp - Material', true), array('controller' => 'dynamiccompositions_materials','action' => 'index')); ?></li>
		<li><?php echo $this->Html->link(__('New Fabric', true), array('action' => 'add')); ?></li>
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