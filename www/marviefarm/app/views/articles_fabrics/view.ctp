<div class="articlesFabrics view">
<h2><?php  __('Articles Fabric');?></h2>
	<dl><?php $i = 0; $class = ' class="altrow"';?>
		<dt<?php if ($i % 2 == 0) echo $class;?>><?php __('Id'); ?></dt>
		<dd<?php if ($i++ % 2 == 0) echo $class;?>>
			<?php echo $articlesFabric['ArticlesFabric']['id']; ?>
			&nbsp;
		</dd>
		<dt<?php if ($i % 2 == 0) echo $class;?>><?php __('Fabric Id'); ?></dt>
		<dd<?php if ($i++ % 2 == 0) echo $class;?>>
			<?php echo $articlesFabric['ArticlesFabric']['fabric_id']; ?>
			&nbsp;
		</dd>
		<dt<?php if ($i % 2 == 0) echo $class;?>><?php __('Article Id'); ?></dt>
		<dd<?php if ($i++ % 2 == 0) echo $class;?>>
			<?php echo $articlesFabric['ArticlesFabric']['article_id']; ?>
			&nbsp;
		</dd>
		<dt<?php if ($i % 2 == 0) echo $class;?>><?php __('Price'); ?></dt>
		<dd<?php if ($i++ % 2 == 0) echo $class;?>>
			<?php echo $articlesFabric['ArticlesFabric']['price']; ?>
			&nbsp;
		</dd>
		<dt<?php if ($i % 2 == 0) echo $class;?>><?php __('Cost'); ?></dt>
		<dd<?php if ($i++ % 2 == 0) echo $class;?>>
			<?php echo $articlesFabric['ArticlesFabric']['cost']; ?>
			&nbsp;
		</dd>
	</dl>
</div>
<div class="actions">
	<h3><?php __('Actions'); ?></h3>
	<ul>
		<li><?php echo $this->Html->link(__('Edit Articles Fabric', true), array('action' => 'edit', $articlesFabric['ArticlesFabric']['id'])); ?> </li>
		<li><?php echo $this->Html->link(__('Delete Articles Fabric', true), array('action' => 'delete', $articlesFabric['ArticlesFabric']['id']), null, sprintf(__('Are you sure you want to delete # %s?', true), $articlesFabric['ArticlesFabric']['id'])); ?> </li>
		<li><?php echo $this->Html->link(__('List Articles Fabrics', true), array('action' => 'index')); ?> </li>
		<li><?php echo $this->Html->link(__('New Articles Fabric', true), array('action' => 'add')); ?> </li>
	</ul>
</div>
