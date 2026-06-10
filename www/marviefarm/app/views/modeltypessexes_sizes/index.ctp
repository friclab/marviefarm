<div class="modeltypessexesSizes index">
	<h2><?php __('Modeltypessexes Sizes');?></h2>
	<table cellpadding="0" cellspacing="0">
	<tr>
			<th><?php echo $this->Paginator->sort('id');?></th>
			<th><?php echo $this->Paginator->sort('modeltypessex_id');?></th>
			<th><?php echo $this->Paginator->sort('size_id');?></th>
			<th class="actions"><?php __('Actions');?></th>
	</tr>
	<?php
	$i = 0;
	foreach ($modeltypessexesSizes as $modeltypessexesSize):
		$class = null;
		if ($i++ % 2 == 0) {
			$class = ' class="altrow"';
		}
	?>
	<tr<?php   echo $class;?>>
		<td><?php echo $modeltypessexesSize['ModeltypessexesSize']['id']; ?>&nbsp;</td>
		<td>
			<?php echo $this->Html->link($modeltypessexesSize['ModeltypesSex']['Modeltype']['code'].' - '.$modeltypessexesSize['ModeltypesSex']['Sex']['code'], array('controller' => 'modeltypes_sexes', 'action' => 'view', $modeltypessexesSize['ModeltypesSex']['id'])); ?>
		</td>
		<td>
			<?php echo $this->Html->link($modeltypessexesSize['Size']['code'], array('controller' => 'sizes', 'action' => 'view', $modeltypessexesSize['Size']['id'])); ?>
		</td>
		<td class="actions">
			<?php echo $this->Html->link(__('View', true), array('action' => 'view', $modeltypessexesSize['ModeltypessexesSize']['id'])); ?>
			<?php echo $this->Html->link(__('Edit', true), array('action' => 'edit', $modeltypessexesSize['ModeltypessexesSize']['id'])); ?>
			<?php echo $this->Html->link(__('Delete', true), array('action' => 'delete', $modeltypessexesSize['ModeltypessexesSize']['id']), null, sprintf(__('Are you sure you want to delete # %s?', true), $modeltypessexesSize['ModeltypessexesSize']['id'])); ?>
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
		<li><?php echo $this->Html->link(__('New Modeltypessexes Size', true), array('action' => 'add')); ?></li>
		<li><?php echo $this->Html->link(__('List Sizes', true), array('controller' => 'sizes', 'action' => 'index')); ?> </li>
		<li><?php echo $this->Html->link(__('New Size', true), array('controller' => 'sizes', 'action' => 'add')); ?> </li>
		<li><?php echo $this->Html->link(__('List Modeltypes Sexes', true), array('controller' => 'modeltypes_sexes', 'action' => 'index')); ?> </li>
		<li><?php echo $this->Html->link(__('New Modeltypes Sex', true), array('controller' => 'modeltypes_sexes', 'action' => 'add')); ?> </li>
	</ul>
</div>