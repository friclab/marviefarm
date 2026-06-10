<div class="modeltypesSexes index">
	<h2><?php __('Modeltypes Sexes');?></h2>
	<table cellpadding="0" cellspacing="0">
	<tr>
			<th><?php echo $this->Paginator->sort('id');?></th>
			<th><?php echo $this->Paginator->sort('modeltype_id');?></th>
			<th><?php echo $this->Paginator->sort('sex_id');?></th>
			<th class="actions"><?php __('Actions');?></th>
	</tr>
	<?php
	$i = 0;
	foreach ($modeltypesSexes as $modeltypesSex):
		$class = null;
		if ($i++ % 2 == 0) {
			$class = ' class="altrow"';
		}
	?>
	<tr<?php echo $class;?>>
		<td><?php echo $modeltypesSex['ModeltypesSex']['id']; ?>&nbsp;</td>
		<td>
			<?php echo $this->Html->link($modeltypesSex['Modeltype']['code'], array('controller' => 'modeltypes', 'action' => 'view', $modeltypesSex['Modeltype']['id'])); ?>
		</td>
		<td>
			<?php echo $this->Html->link($modeltypesSex['Sex']['code'], array('controller' => 'sexes', 'action' => 'view', $modeltypesSex['Sex']['id'])); ?>
		</td>
		<td class="actions">
			<?php echo $this->Html->link(__('View', true), array('action' => 'view', $modeltypesSex['ModeltypesSex']['id'])); ?>
			<?php echo $this->Html->link(__('Edit', true), array('action' => 'edit', $modeltypesSex['ModeltypesSex']['id'])); ?>
			<?php echo $this->Html->link(__('Delete', true), array('action' => 'delete', $modeltypesSex['ModeltypesSex']['id']), null, sprintf(__('Are you sure you want to delete # %s?', true), $modeltypesSex['ModeltypesSex']['id'])); ?>
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
		<li><?php echo $this->Html->link(__('New Modeltypes Sex', true), array('action' => 'add')); ?></li>
		<li><?php echo $this->Html->link(__('List Modeltypes', true), array('controller' => 'modeltypes', 'action' => 'index')); ?> </li>
		<li><?php echo $this->Html->link(__('New Modeltype', true), array('controller' => 'modeltypes', 'action' => 'add')); ?> </li>
		<li><?php echo $this->Html->link(__('List Sexes', true), array('controller' => 'sexes', 'action' => 'index')); ?> </li>
		<li><?php echo $this->Html->link(__('New Sex', true), array('controller' => 'sexes', 'action' => 'add')); ?> </li>
		<li><?php echo $this->Html->link(__('List Articles', true), array('controller' => 'articles', 'action' => 'index')); ?> </li>
		<li><?php echo $this->Html->link(__('New Article', true), array('controller' => 'articles', 'action' => 'add')); ?> </li>
		<li><?php echo $this->Html->link(__('List Modeltypessexes Sizes', true), array('controller' => 'modeltypessexes_sizes', 'action' => 'index')); ?> </li>
		<li><?php echo $this->Html->link(__('New Modeltypessexes Size', true), array('controller' => 'modeltypessexes_sizes', 'action' => 'add')); ?> </li>
	</ul>
</div>