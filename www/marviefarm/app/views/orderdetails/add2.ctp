

<div class="orderdetails form"><?php echo $this->Form->create('Orderdetail'); ?>
    <fieldset><legend><?php __('Add Orderdetail'); ?></legend> <?php
echo $this->Form->input('orderheader_id');
echo $this->Form->input('article_id', array('after' => $this->Html->tag('span', '', array('id' => 'articleInfo', 'class' => 'input'))));
//echo $this->Form->label('ArticleInfo','',array('id' => 'articleInfo'));
//echo $this->Html->tag('span', '', array('id' => 'articleInfo'));
echo $this->Form->input('fabric_id');
echo $this->Form->input('note');
//echo $this->Form->input('qta');
?>


        <div class="input text" id="taglieqta"><input
                name="data[Orderdetail][qta]" type="text" maxlength="11"
                id="OrderdetailQta" /></div>
        <script type="text/javascript">
	
            $(document).ready(
            function () {
                $("#OrderdetailArticleId").bind("change", function (event) {
                    $.ajax({async:true, 
                        data:$("#OrderdetailArticleId").serialize(), 
                        dataType:"html", 
                        success:function (data, textStatus) {$("#taglieqta").html(data);}, 
                        type:"POST", url:"/marviefarm/orderdetails/getModeltypessexessizeOptions2"});
                    return false;});
            });
        </script> <?php
        $this->Js->get('#OrderdetailArticleId')->event('change', $this->Js->request(array('controller' => 'orderdetails', 'action' => 'getFabricOptions'), array(
                    'method' => 'POST',
                    'type' => 'json',
                    'async' => true,
                    'update' => '#OrderdetailFabricId',
                    'dataExpression' => true,
                    'data' => $this->Js->serializeForm(array('isForm' => true, 'inline' => true))
                        )
                )
        );

        $this->Js->get('#OrderdetailArticleId')->event('change', $this->Js->request(array('controller' => 'orderdetails', 'action' => 'getArticleInfo'), array(
                    'method' => 'POST',
                    'type' => 'json',
                    'async' => true,
                    'update' => '#articleInfo',
                    'dataExpression' => true,
                    'data' => $this->Js->serializeForm(array('isForm' => true, 'inline' => true))
                        )
                )
        );
?></fieldset>
        <?php echo $this->Form->end(__('Submit', true)); ?></div>
<div class="actions">
    <h3><?php __('Actions'); ?></h3>
    <ul>

        <li><?php echo $this->Html->link(__('List Orderdetails', true), array('action' => 'index')); ?></li>
        <li><?php echo $this->Html->link(__('List Orderheaders', true), array('controller' => 'orderheaders', 'action' => 'index')); ?>
        </li>
        <li><?php echo $this->Html->link(__('New Orderheader', true), array('controller' => 'orderheaders', 'action' => 'add')); ?>
        </li>
        <li><?php echo $this->Html->link(__('List Articles', true), array('controller' => 'articles', 'action' => 'index')); ?>
        </li>
        <li><?php echo $this->Html->link(__('New Article', true), array('controller' => 'articles', 'action' => 'add')); ?>
        </li>
        <li><?php echo $this->Html->link(__('List Fabrics', true), array('controller' => 'fabrics', 'action' => 'index')); ?>
        </li>
        <li><?php echo $this->Html->link(__('New Fabric', true), array('controller' => 'fabrics', 'action' => 'add')); ?>
        </li>
        <li><?php echo $this->Html->link(__('List Modeltypessexes Sizes', true), array('controller' => 'modeltypessexes_sizes', 'action' => 'index')); ?>
        </li>
        <li><?php echo $this->Html->link(__('New Modeltypessexes Size', true), array('controller' => 'modeltypessexes_sizes', 'action' => 'add')); ?>
        </li>
    </ul>
<?php //echo $this->element('countdown');  ?>
</div>
<script type="text/javascript">
    <!--
    $(document).ready( function (event) 
    {$.ajax({async:true, data:$("#OrderdetailArticleId").serialize(), dataType:"html", success:function (data, textStatus) {$("#articleInfo").html(data);}, type:"POST", url:"/marviefarm/orderdetails/getArticleInfo"});
        return false;});
 
    $(document).ready(  function (event) {$.ajax({async:true, data:$("#OrderdetailArticleId").serialize(), dataType:"html", success:function (data, textStatus) {$("#OrderdetailFabricId").html(data);}, type:"POST", url:"/marviefarm/orderdetails/getFabricOptions"});
        return false;});

    $(document).ready(
    function (event) {
			 
        $.ajax({async:true, 
            data:$("#OrderdetailArticleId").serialize(), 
            dataType:"html", 
            success:function (data, textStatus) {$("#taglieqta").html(data);}, 
            type:"POST", url:"/marviefarm/orderdetails/getModeltypessexessizeOptions2"});
        return false;});
	 

    //-->
</script>
