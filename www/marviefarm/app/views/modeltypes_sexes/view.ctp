<div class="modeltypesSexes view">
<h2><?php  __('Modeltypes Sex');?></h2>
	<dl><?php $i = 0; $class = ' class="altrow"';?>
		<dt<?php if ($i % 2 == 0) echo $class;?>><?php __('Id'); ?></dt>
		<dd<?php if ($i++ % 2 == 0) echo $class;?>>
			<?php echo $modeltypesSex['ModeltypesSex']['id']; ?>
			&nbsp;
		</dd>
		<dt<?php if ($i % 2 == 0) echo $class;?>><?php __('Modeltype'); ?></dt>
		<dd<?php if ($i++ % 2 == 0) echo $class;?>>
			<?php echo $this->Html->link($modeltypesSex['Modeltype']['code'], array('controller' => 'modeltypes', 'action' => 'view', $modeltypesSex['Modeltype']['id'])); ?>
			&nbsp;
		</dd>
		<dt<?php if ($i % 2 == 0) echo $class;?>><?php __('Sex'); ?></dt>
		<dd<?php if ($i++ % 2 == 0) echo $class;?>>
			<?php echo $this->Html->link($modeltypesSex['Sex']['code'], array('controller' => 'sexes', 'action' => 'view', $modeltypesSex['Sex']['id'])); ?>
			&nbsp;
		</dd>
	</dl>
</div>
<div class="actions">
	<h3><?php __('Actions'); ?></h3>
	<ul>
		<li><?php echo $this->Html->link(__('Edit Modeltypes Sex', true), array('action' => 'edit', $modeltypesSex['ModeltypesSex']['id'])); ?> </li>
		<li><?php echo $this->Html->link(__('Delete Modeltypes Sex', true), array('action' => 'delete', $modeltypesSex['ModeltypesSex']['id']), null, sprintf(__('Are you sure you want to delete # %s?', true), $modeltypesSex['ModeltypesSex']['id'])); ?> </li>
		<li><?php echo $this->Html->link(__('List Modeltypes Sexes', true), array('action' => 'index')); ?> </li>
		<li><?php echo $this->Html->link(__('New Modeltypes Sex', true), array('action' => 'add')); ?> </li>
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
<div class="related">
	<h3><?php __('Related Articles');?></h3>
	<?php if (!empty($modeltypesSex['Article'])):?>
	<table cellpadding = "0" cellspacing = "0">
	<tr>
		<th><?php __('Id'); ?></th>
		<th><?php __('Name'); ?></th>
		<th><?php __('Description'); ?></th>
		<th><?php __('Modeltypes Sex Id'); ?></th>
		<th><?php __('Image'); ?></th>
		<th class="actions"><?php __('Actions');?></th>
	</tr>
	<?php
		$i = 0;
		foreach ($modeltypesSex['Article'] as $article):
			$class = null;
			if ($i++ % 2 == 0) {
				$class = ' class="altrow"';
			}
		?>
		<tr<?php echo $class;?>>
			<td><?php echo $article['id'];?></td>
			<td><?php echo $article['name'];?></td>
			<td><?php echo $article['description'];?></td>
			<td><?php echo $article['modeltypes_sex_id'];?></td>
			<td><?php echo $article['image'];?></td>
			<td class="actions">
				<?php echo $this->Html->link(__('View', true), array('controller' => 'articles', 'action' => 'view', $article['id'])); ?>
				<?php echo $this->Html->link(__('Edit', true), array('controller' => 'articles', 'action' => 'edit', $article['id'])); ?>
				<?php echo $this->Html->link(__('Delete', true), array('controller' => 'articles', 'action' => 'delete', $article['id']), null, sprintf(__('Are you sure you want to delete # %s?', true), $article['id'])); ?>
			</td>
		</tr>
	<?php endforeach; ?>
	</table>
<?php endif; ?>

	<div class="actions">
		<ul>
			<li><?php echo $this->Html->link(__('New Article', true), array('controller' => 'articles', 'action' => 'add'));?> </li>
		</ul>
	</div>
</div>
<div class="related">
	<h3><?php __('Related Modeltypessexes Sizes');?></h3>
	<?php if (!empty($modeltypesSex['ModeltypessexesSize'])):?>
	<table cellpadding = "0" cellspacing = "0">
	<tr>
		<th><?php __('Id'); ?></th>
		<th><?php __('Modeltypessex Id'); ?></th>
		<th><?php __('Size Id'); ?></th>
		<th class="actions"><?php __('Actions');?></th>
	</tr>
	<?php
		$i = 0;
		foreach ($modeltypesSex['ModeltypessexesSize'] as $modeltypessexesSize):
			$class = null;
			if ($i++ % 2 == 0) {
				$class = ' class="altrow"';
			}
		?>
		<tr<?php echo $class;?>>
			<td><?php echo $modeltypessexesSize['id'];?></td>
			<td><?php echo $modeltypessexesSize['modeltypessex_id'];?></td>
			<td><?php echo $modeltypessexesSize['size_id'];?></td>
			<td class="actions">
				<?php echo $this->Html->link(__('View', true), array('controller' => 'modeltypessexes_sizes', 'action' => 'view', $modeltypessexesSize['id'])); ?>
				<?php echo $this->Html->link(__('Edit', true), array('controller' => 'modeltypessexes_sizes', 'action' => 'edit', $modeltypessexesSize['id'])); ?>
				<?php echo $this->Html->link(__('Delete', true), array('controller' => 'modeltypessexes_sizes', 'action' => 'delete', $modeltypessexesSize['id']), null, sprintf(__('Are you sure you want to delete # %s?', true), $modeltypessexesSize['id'])); ?>
			</td>
		</tr>
	<?php endforeach; ?>
	</table>
<?php endif; ?>

	<div class="actions">
		<ul>
			<li><?php echo $this->Html->link(__('New Modeltypessexes Size', true), array('controller' => 'modeltypessexes_sizes', 'action' => 'add'));?> </li>
		</ul>
	</div>
</div>
