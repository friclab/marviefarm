<?php   echo($javascript->link("toggle.js")); ?> 

<div class="articles index">
	<h2><?php __('Articles');?></h2>
	<table cellpadding="0" cellspacing="0">
	<tr>
			<th><?php echo $this->Paginator->sort('id');?></th>
			<th><?php echo $this->Paginator->sort('name');?></th>
			<th><?php echo $this->Paginator->sort('description');?></th>
			<th><?php echo $this->Paginator->sort('modeltypes_sex_id');?></th>
			<th><?php echo  _('image');?></th>
			<th class="actions"><?php __('Actions');?></th>
	</tr>
	<?php
	$i = 0;
	foreach ($articles as $article):
		$class = null;
		if ($i++ % 2 == 0) {
			$class = ' class="altrow"';
		}
	?>

	<tr<?php echo $class;  ?>>
		<td><?php echo $article['Article']['id']; ?>&nbsp;</td>
		<td><?php echo $article['Article']['name']; ?>&nbsp;</td>
		<td><?php echo $article['Article']['description']; ?>&nbsp;</td>
		<td>
			<?php echo $this->Html->link($article['ModeltypesSex']['id'], array('controller' => 'modeltypes_sexes', 'action' => 'view', $article['ModeltypesSex']['id'])); ?>
		</td>
		<td>
		<a onclick="return toggle('image<?php echo $article['Article']['id']; ?>')">Show image</a>
		<div  id="image<?php echo $article['Article']['id'] ?>" style="display:none"> 
			<?php  echo $this->Html->image(array('controller'=>'articles','action'=>'show',$article['Article']['id']),
		array('title'=>'article '.$article['Article']['name'], 'height'=>'150px'));
		
 ?> </div></td>
		<td class="actions">
			<?php echo $this->Html->link(__('View', true), array('action' => 'view', $article['Article']['id'])); ?>
			<?php echo $this->Html->link(__('Edit', true), array('action' => 'edit', $article['Article']['id'])); ?>
			<?php echo $this->Html->link(__('Delete', true), array('action' => 'delete', $article['Article']['id']), null, sprintf(__('Are you sure you want to delete # %s?', true), $article['Article']['id'])); ?>
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
		<li><?php echo $this->Html->link(__('New Article', true), array('action' => 'add')); ?></li>
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