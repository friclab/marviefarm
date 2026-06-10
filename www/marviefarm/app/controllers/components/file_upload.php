
    

  

<!DOCTYPE html>
<html>
  <head>
    <meta charset='utf-8'>
    <meta http-equiv="X-UA-Compatible" content="chrome=1">
        <title>controllers/components/file_upload.php at master from webtechnick/CakePHP-FileUpload-Plugin - GitHub</title>
    <link rel="search" type="application/opensearchdescription+xml" href="/opensearch.xml" title="GitHub" />
    <link rel="fluid-icon" href="https://github.com/fluidicon.png" title="GitHub" />

    <link href="https://assets2.github.com/stylesheets/bundle_common.css?42a88d59f4e6454178639ad0cc38846a091c9551" media="screen" rel="stylesheet" type="text/css" />
<link href="https://assets1.github.com/stylesheets/bundle_github.css?42a88d59f4e6454178639ad0cc38846a091c9551" media="screen" rel="stylesheet" type="text/css" />

    <script type="text/javascript">
      if (typeof console == "undefined" || typeof console.log == "undefined")
        console = { log: function() {} }
    </script>
    <script type="text/javascript" charset="utf-8">
      var GitHub = {}
      var github_user = null
      
    </script>
    <script src="https://assets0.github.com/javascripts/jquery/jquery-1.4.2.min.js?42a88d59f4e6454178639ad0cc38846a091c9551" type="text/javascript"></script>
    <script src="https://assets0.github.com/javascripts/bundle_common.js?42a88d59f4e6454178639ad0cc38846a091c9551" type="text/javascript"></script>
<script src="https://assets1.github.com/javascripts/bundle_github.js?42a88d59f4e6454178639ad0cc38846a091c9551" type="text/javascript"></script>


        <script type="text/javascript" charset="utf-8">
      GitHub.spy({
        repo: "webtechnick/CakePHP-FileUpload-Plugin"
      })
    </script>

    
  <link href="https://github.com/webtechnick/CakePHP-FileUpload-Plugin/commits/master.atom" rel="alternate" title="Recent Commits to CakePHP-FileUpload-Plugin:master" type="application/atom+xml" />

        <meta name="description" content="CakePHP File Upload Handling Plugin" />
    <script type="text/javascript">
      GitHub.nameWithOwner = GitHub.nameWithOwner || "webtechnick/CakePHP-FileUpload-Plugin";
      GitHub.currentRef = 'master';
      GitHub.commitSHA = "45c25d96485f03904673310ab17849c6ba30501b";
      GitHub.currentPath = 'controllers/components/file_upload.php';
      GitHub.masterBranch = "master";

      
    </script>
  

        <script type="text/javascript">
      var _gaq = _gaq || [];
      _gaq.push(['_setAccount', 'UA-3769691-2']);
      _gaq.push(['_setDomainName', 'none']);
      _gaq.push(['_trackPageview']);
      (function() {
        var ga = document.createElement('script');
        ga.src = ('https:' == document.location.protocol ? 'https://ssl' : 'http://www') + '.google-analytics.com/ga.js';
        ga.setAttribute('async', 'true');
        document.documentElement.firstChild.appendChild(ga);
      })();
    </script>

    
  </head>

  

  <body class="logged_out page-blob">
    

    

    

    
      <div id="site_alert">
        <form action="/translate?to=%2Fwebtechnick%2FCakePHP-FileUpload-Plugin%2Fblob%2Fmaster%2Fcontrollers%2Fcomponents%2Ffile_upload.php" method="post"><div style="margin:0;padding:0"><input name="authenticity_token" type="hidden" value="adac8e2838ad68f406703237ee35dfac5ba1d47e" /></div>        <p>
          Would you rather see this site in Italian? (Vorresti visualizzare questo sito in Italiano?) &nbsp;
          <button class="minibutton" name="code" value="it"><span>Yes (Si)</span></button> &nbsp;
          <button class="minibutton" name="code" value="en"><span>No (No)</span></button>
        </p>
        </form>      </div>
    

    

    <div class="subnavd" id="main">
      <div id="header" class="true">
        
          <a class="logo boring" href="https://github.com">
            <img src="/images/modules/header/logov3.png?changed" class="default" alt="github" />
            <!--[if (gt IE 8)|!(IE)]><!-->
            <img src="/images/modules/header/logov3-hover.png" class="hover" alt="github" />
            <!--<![endif]-->
          </a>
        
        
        <div class="topsearch">
  
    <ul class="nav logged_out">
      <li class="pricing"><a href="/plans">Pricing and Signup</a></li>
      <li class="explore"><a href="/explore">Explore GitHub</a></li>
      <li class="features"><a href="/features">Features</a></li>
      <li class="blog"><a href="/blog">Blog</a></li>
      <li class="login"><a href="/login?return_to=https://github.com/webtechnick/CakePHP-FileUpload-Plugin/blob/master/controllers/components/file_upload.php">Login</a></li>
    </ul>
  
</div>

      </div>

      
      
        
    <div class="site">
      <div class="pagehead repohead vis-public   ">

      

      <div class="title-actions-bar">
        <h1>
          <a href="/webtechnick">webtechnick</a> / <strong><a href="https://github.com/webtechnick/CakePHP-FileUpload-Plugin">CakePHP-FileUpload-Plugin</a></strong>
          
          
        </h1>

        
    <ul class="actions">
      

      
        <li class="for-owner" style="display:none"><a href="https://github.com/webtechnick/CakePHP-FileUpload-Plugin/admin" class="minibutton btn-admin "><span><span class="icon"></span>Admin</span></a></li>
        <li>
          <a href="/webtechnick/CakePHP-FileUpload-Plugin/toggle_watch" class="minibutton btn-watch " id="watch_button" onclick="var f = document.createElement('form'); f.style.display = 'none'; this.parentNode.appendChild(f); f.method = 'POST'; f.action = this.href;var s = document.createElement('input'); s.setAttribute('type', 'hidden'); s.setAttribute('name', 'authenticity_token'); s.setAttribute('value', 'adac8e2838ad68f406703237ee35dfac5ba1d47e'); f.appendChild(s);f.submit();return false;" style="display:none"><span><span class="icon"></span>Watch</span></a>
          <a href="/webtechnick/CakePHP-FileUpload-Plugin/toggle_watch" class="minibutton btn-watch " id="unwatch_button" onclick="var f = document.createElement('form'); f.style.display = 'none'; this.parentNode.appendChild(f); f.method = 'POST'; f.action = this.href;var s = document.createElement('input'); s.setAttribute('type', 'hidden'); s.setAttribute('name', 'authenticity_token'); s.setAttribute('value', 'adac8e2838ad68f406703237ee35dfac5ba1d47e'); f.appendChild(s);f.submit();return false;" style="display:none"><span><span class="icon"></span>Unwatch</span></a>
        </li>
        
          
            <li class="for-notforked" style="display:none"><a href="/webtechnick/CakePHP-FileUpload-Plugin/fork" class="minibutton btn-fork " id="fork_button" onclick="var f = document.createElement('form'); f.style.display = 'none'; this.parentNode.appendChild(f); f.method = 'POST'; f.action = this.href;var s = document.createElement('input'); s.setAttribute('type', 'hidden'); s.setAttribute('name', 'authenticity_token'); s.setAttribute('value', 'adac8e2838ad68f406703237ee35dfac5ba1d47e'); f.appendChild(s);f.submit();return false;"><span><span class="icon"></span>Fork</span></a></li>
            <li class="for-hasfork" style="display:none"><a href="#" class="minibutton btn-fork " id="your_fork_button"><span><span class="icon"></span>Your Fork</span></a></li>
          

          
        
      
      
      <li class="repostats">
        <ul class="repo-stats">
          <li class="watchers"><a href="/webtechnick/CakePHP-FileUpload-Plugin/watchers" title="Watchers" class="tooltipped downwards">53</a></li>
          <li class="forks"><a href="/webtechnick/CakePHP-FileUpload-Plugin/network" title="Forks" class="tooltipped downwards">8</a></li>
        </ul>
      </li>
    </ul>

      </div>

        
  <ul class="tabs">
    <li><a href="https://github.com/webtechnick/CakePHP-FileUpload-Plugin" class="selected" highlight="repo_source">Source</a></li>
    <li><a href="https://github.com/webtechnick/CakePHP-FileUpload-Plugin/commits/master" highlight="repo_commits">Commits</a></li>
    <li><a href="/webtechnick/CakePHP-FileUpload-Plugin/network" highlight="repo_network">Network</a></li>
    <li><a href="/webtechnick/CakePHP-FileUpload-Plugin/pulls" highlight="repo_pulls">Pull Requests (0)</a></li>

    

    
      
      <li><a href="/webtechnick/CakePHP-FileUpload-Plugin/issues" highlight="issues">Issues (3)</a></li>
    

                <li><a href="/webtechnick/CakePHP-FileUpload-Plugin/wiki" highlight="repo_wiki">Wiki (3)</a></li>
        
    <li><a href="/webtechnick/CakePHP-FileUpload-Plugin/graphs" highlight="repo_graphs">Graphs</a></li>

    <li class="contextswitch nochoices">
      <span class="toggle leftwards" >
        <em>Branch:</em>
        <code>master</code>
      </span>
    </li>
  </ul>

  <div style="display:none" id="pl-description"><p><em class="placeholder">click here to add a description</em></p></div>
  <div style="display:none" id="pl-homepage"><p><em class="placeholder">click here to add a homepage</em></p></div>

  <div class="subnav-bar">
  
  <ul>
    <li>
      <a href="#" class="dropdown">Switch Branches (1)</a>
      <ul>
        
          
            <li><strong>master &#x2713;</strong></li>
            
      </ul>
    </li>
    <li>
      <a href="#" class="dropdown defunct">Switch Tags (0)</a>
      
    </li>
    <li>
    
    <a href="/webtechnick/CakePHP-FileUpload-Plugin/branches" class="manage">Branch List</a>
    
    </li>
  </ul>
</div>

  
  
  
  
  
  



        
    <div class="frame frame-center tree-finder" style="display: none">
      <div class="breadcrumb">
        <b><a href="/webtechnick/CakePHP-FileUpload-Plugin">CakePHP-FileUpload-Plugin</a></b> /
        <input class="tree-finder-input" type="text" name="query" autocomplete="off" spellcheck="false">
      </div>

      
        <div class="octotip">
          <p>
            <a href="/webtechnick/CakePHP-FileUpload-Plugin/dismiss-tree-finder-help" class="dismiss js-dismiss-tree-list-help" title="Hide this notice forever">Dismiss</a>
            <strong>Octotip:</strong> You've activated the <em>file finder</em> by pressing <span class="kbd">t</span>
            Start typing to filter the file list. Use <span class="kbd badmono">↑</span> and <span class="kbd badmono">↓</span> to navigate,
            <span class="kbd">enter</span> to view files.
          </p>
        </div>
      

      <table class="tree-browser" cellpadding="0" cellspacing="0">
        <tr class="js-header"><th>&nbsp;</th><th>name</th></tr>
        <tr class="js-no-results no-results" style="display: none">
          <th colspan="2">No matching files</th>
        </tr>
        <tbody class="js-results-list">
        </tbody>
      </table>
    </div>

    <div id="jump-to-line" style="display:none">
      <h2>Jump to Line</h2>
      <form>
        <input class="textfield" type="text">
        <div class="full-button">
          <button type="submit" class="classy">
            <span>Go</span>
          </button>
        </div>
      </form>
    </div>

    <div id="repo_details" class="metabox clearfix">
      <div id="repo_details_loader" class="metabox-loader" style="display:none">Sending Request&hellip;</div>

        <a href="/webtechnick/CakePHP-FileUpload-Plugin/downloads" class="download-source" id="download_button" title="Download source, tagged packages and binaries."><span class="icon"></span>Downloads</a>

      <div id="repository_desc_wrapper">
      <div id="repository_description" rel="repository_description_edit">
        
          <p>CakePHP File Upload Handling Plugin
            <span id="read_more" style="display:none">&mdash; <a href="#readme">Read more</a></span>
          </p>
        
      </div>

      <div id="repository_description_edit" style="display:none;" class="inline-edit">
        <form action="/webtechnick/CakePHP-FileUpload-Plugin/admin/update" method="post"><div style="margin:0;padding:0"><input name="authenticity_token" type="hidden" value="adac8e2838ad68f406703237ee35dfac5ba1d47e" /></div>
          <input type="hidden" name="field" value="repository_description">
          <input type="text" class="textfield" name="value" value="CakePHP File Upload Handling Plugin">
          <div class="form-actions">
            <button class="minibutton"><span>Save</span></button> &nbsp; <a href="#" class="cancel">Cancel</a>
          </div>
        </form>
      </div>

      
      <div class="repository-homepage" id="repository_homepage" rel="repository_homepage_edit">
        <p><a href="http://www.webtechnick.com" rel="nofollow">http://www.webtechnick.com</a></p>
      </div>

      <div id="repository_homepage_edit" style="display:none;" class="inline-edit">
        <form action="/webtechnick/CakePHP-FileUpload-Plugin/admin/update" method="post"><div style="margin:0;padding:0"><input name="authenticity_token" type="hidden" value="adac8e2838ad68f406703237ee35dfac5ba1d47e" /></div>
          <input type="hidden" name="field" value="repository_homepage">
          <input type="text" class="textfield" name="value" value="http://www.webtechnick.com">
          <div class="form-actions">
            <button class="minibutton"><span>Save</span></button> &nbsp; <a href="#" class="cancel">Cancel</a>
          </div>
        </form>
      </div>
      </div>
      <div class="rule "></div>
            <div id="url_box" class="url-box">
        <ul class="clone-urls">
          
            
            <li id="http_clone_url"><a href="https://github.com/webtechnick/CakePHP-FileUpload-Plugin.git" data-permissions="Read-Only">HTTP</a></li>
            <li id="public_clone_url"><a href="git://github.com/webtechnick/CakePHP-FileUpload-Plugin.git" data-permissions="Read-Only">Git Read-Only</a></li>
          
          
        </ul>
        <input type="text" spellcheck="false" id="url_field" class="url-field" />
              <span style="display:none" id="url_box_clippy"></span>
      <span id="clippy_tooltip_url_box_clippy" class="clippy-tooltip tooltipped" title="copy to clipboard">
      <object classid="clsid:d27cdb6e-ae6d-11cf-96b8-444553540000"
              width="14"
              height="14"
              class="clippy"
              id="clippy" >
      <param name="movie" value="https://assets3.github.com/flash/clippy.swf?v5"/>
      <param name="allowScriptAccess" value="always" />
      <param name="quality" value="high" />
      <param name="scale" value="noscale" />
      <param NAME="FlashVars" value="id=url_box_clippy&amp;copied=&amp;copyto=">
      <param name="bgcolor" value="#FFFFFF">
      <param name="wmode" value="opaque">
      <embed src="https://assets3.github.com/flash/clippy.swf?v5"
             width="14"
             height="14"
             name="clippy"
             quality="high"
             allowScriptAccess="always"
             type="application/x-shockwave-flash"
             pluginspage="http://www.macromedia.com/go/getflashplayer"
             FlashVars="id=url_box_clippy&amp;copied=&amp;copyto="
             bgcolor="#FFFFFF"
             wmode="opaque"
      />
      </object>
      </span>

        <p id="url_description">This URL has <strong>Read+Write</strong> access</p>
      </div>
    </div>


        

      </div><!-- /.pagehead -->

      

  





<script type="text/javascript">
  GitHub.downloadRepo = '/webtechnick/CakePHP-FileUpload-Plugin/archives/master'
  GitHub.revType = "master"

  GitHub.controllerName = "blob"
  GitHub.actionName     = "show"
  GitHub.currentAction  = "blob#show"

  

  
</script>






<div class="flash-messages"></div>


  <div id="commit">
    <div class="group">
        
  <div class="envelope commit">
    <div class="human">
      
        <div class="message"><pre><a href="/webtechnick/CakePHP-FileUpload-Plugin/commit/45c25d96485f03904673310ab17849c6ba30501b">Updating documetation</a> </pre></div>
      

      <div class="actor">
        <div class="gravatar">
          
          <img src="https://secure.gravatar.com/avatar/108dc0e4a4973926f890206ee5bb46db?s=140&d=https://github.com%2Fimages%2Fgravatars%2Fgravatar-140.png" alt="" width="30" height="30"  />
        </div>
        <div class="name"><a href="/webtechnick">webtechnick</a> <span>(author)</span></div>
        <div class="date">
          <abbr class="relatize" title="2011-02-14 16:04:27">Mon Feb 14 16:04:27 -0800 2011</abbr>
        </div>
      </div>

      

    </div>
    <div class="machine">
      <span>c</span>ommit&nbsp;&nbsp;<a href="/webtechnick/CakePHP-FileUpload-Plugin/commit/45c25d96485f03904673310ab17849c6ba30501b" hotkey="c">45c25d96485f03904673</a><br />
      <span>t</span>ree&nbsp;&nbsp;&nbsp;&nbsp;<a href="/webtechnick/CakePHP-FileUpload-Plugin/tree/45c25d96485f03904673310ab17849c6ba30501b" hotkey="t">8d807496db3f40b982ad</a><br />
      
        <span>p</span>arent&nbsp;
        
        <a href="/webtechnick/CakePHP-FileUpload-Plugin/tree/72f5fc67e286705cf67229696d4e269f6d15dfe0" hotkey="p">72f5fc67e286705cf672</a>
      

    </div>
  </div>

    </div>
  </div>



  <div id="slider">

  

    <div class="breadcrumb" data-path="controllers/components/file_upload.php/">
      <b><a href="/webtechnick/CakePHP-FileUpload-Plugin/tree/45c25d96485f03904673310ab17849c6ba30501b">CakePHP-FileUpload-Plugin</a></b> / <a href="/webtechnick/CakePHP-FileUpload-Plugin/tree/45c25d96485f03904673310ab17849c6ba30501b/controllers">controllers</a> / <a href="/webtechnick/CakePHP-FileUpload-Plugin/tree/45c25d96485f03904673310ab17849c6ba30501b/controllers/components">components</a> / file_upload.php       <span style="display:none" id="clippy_544">controllers/components/file_upload.php</span>
      
      <object classid="clsid:d27cdb6e-ae6d-11cf-96b8-444553540000"
              width="110"
              height="14"
              class="clippy"
              id="clippy" >
      <param name="movie" value="https://assets3.github.com/flash/clippy.swf?v5"/>
      <param name="allowScriptAccess" value="always" />
      <param name="quality" value="high" />
      <param name="scale" value="noscale" />
      <param NAME="FlashVars" value="id=clippy_544&amp;copied=copied!&amp;copyto=copy to clipboard">
      <param name="bgcolor" value="#FFFFFF">
      <param name="wmode" value="opaque">
      <embed src="https://assets3.github.com/flash/clippy.swf?v5"
             width="110"
             height="14"
             name="clippy"
             quality="high"
             allowScriptAccess="always"
             type="application/x-shockwave-flash"
             pluginspage="http://www.macromedia.com/go/getflashplayer"
             FlashVars="id=clippy_544&amp;copied=copied!&amp;copyto=copy to clipboard"
             bgcolor="#FFFFFF"
             wmode="opaque"
      />
      </object>
      

    </div>

    <div class="frames">
      <div class="frame frame-center" data-path="controllers/components/file_upload.php/">
        
          <ul class="big-actions">
            
            <li><a class="file-edit-link minibutton" href="/webtechnick/CakePHP-FileUpload-Plugin/file-edit/__current_ref__/controllers/components/file_upload.php"><span>Edit this file</span></a></li>
          </ul>
        

        <div id="files">
          <div class="file">
            <div class="meta">
              <div class="info">
                <span class="icon"><img alt="Txt" height="16" src="https://assets0.github.com/images/icons/txt.png?687516e2db26cd6e9ef6c0b6fb9814ba672338db" width="16" /></span>
                <span class="mode" title="File Mode">100644</span>
                
                  <span>490 lines (443 sloc)</span>
                
                <span>15.138 kb</span>
              </div>
              <ul class="actions">
                <li><a href="/webtechnick/CakePHP-FileUpload-Plugin/raw/master/controllers/components/file_upload.php" id="raw-url">raw</a></li>
                
                  <li><a href="/webtechnick/CakePHP-FileUpload-Plugin/blame/master/controllers/components/file_upload.php">blame</a></li>
                
                <li><a href="/webtechnick/CakePHP-FileUpload-Plugin/commits/master/controllers/components/file_upload.php">history</a></li>
              </ul>
            </div>
            
  <div class="data type-php">
    
      <table cellpadding="0" cellspacing="0">
        <tr>
          <td>
            <pre class="line_numbers"><span id="L1" rel="#L1">1</span>
<span id="L2" rel="#L2">2</span>
<span id="L3" rel="#L3">3</span>
<span id="L4" rel="#L4">4</span>
<span id="L5" rel="#L5">5</span>
<span id="L6" rel="#L6">6</span>
<span id="L7" rel="#L7">7</span>
<span id="L8" rel="#L8">8</span>
<span id="L9" rel="#L9">9</span>
<span id="L10" rel="#L10">10</span>
<span id="L11" rel="#L11">11</span>
<span id="L12" rel="#L12">12</span>
<span id="L13" rel="#L13">13</span>
<span id="L14" rel="#L14">14</span>
<span id="L15" rel="#L15">15</span>
<span id="L16" rel="#L16">16</span>
<span id="L17" rel="#L17">17</span>
<span id="L18" rel="#L18">18</span>
<span id="L19" rel="#L19">19</span>
<span id="L20" rel="#L20">20</span>
<span id="L21" rel="#L21">21</span>
<span id="L22" rel="#L22">22</span>
<span id="L23" rel="#L23">23</span>
<span id="L24" rel="#L24">24</span>
<span id="L25" rel="#L25">25</span>
<span id="L26" rel="#L26">26</span>
<span id="L27" rel="#L27">27</span>
<span id="L28" rel="#L28">28</span>
<span id="L29" rel="#L29">29</span>
<span id="L30" rel="#L30">30</span>
<span id="L31" rel="#L31">31</span>
<span id="L32" rel="#L32">32</span>
<span id="L33" rel="#L33">33</span>
<span id="L34" rel="#L34">34</span>
<span id="L35" rel="#L35">35</span>
<span id="L36" rel="#L36">36</span>
<span id="L37" rel="#L37">37</span>
<span id="L38" rel="#L38">38</span>
<span id="L39" rel="#L39">39</span>
<span id="L40" rel="#L40">40</span>
<span id="L41" rel="#L41">41</span>
<span id="L42" rel="#L42">42</span>
<span id="L43" rel="#L43">43</span>
<span id="L44" rel="#L44">44</span>
<span id="L45" rel="#L45">45</span>
<span id="L46" rel="#L46">46</span>
<span id="L47" rel="#L47">47</span>
<span id="L48" rel="#L48">48</span>
<span id="L49" rel="#L49">49</span>
<span id="L50" rel="#L50">50</span>
<span id="L51" rel="#L51">51</span>
<span id="L52" rel="#L52">52</span>
<span id="L53" rel="#L53">53</span>
<span id="L54" rel="#L54">54</span>
<span id="L55" rel="#L55">55</span>
<span id="L56" rel="#L56">56</span>
<span id="L57" rel="#L57">57</span>
<span id="L58" rel="#L58">58</span>
<span id="L59" rel="#L59">59</span>
<span id="L60" rel="#L60">60</span>
<span id="L61" rel="#L61">61</span>
<span id="L62" rel="#L62">62</span>
<span id="L63" rel="#L63">63</span>
<span id="L64" rel="#L64">64</span>
<span id="L65" rel="#L65">65</span>
<span id="L66" rel="#L66">66</span>
<span id="L67" rel="#L67">67</span>
<span id="L68" rel="#L68">68</span>
<span id="L69" rel="#L69">69</span>
<span id="L70" rel="#L70">70</span>
<span id="L71" rel="#L71">71</span>
<span id="L72" rel="#L72">72</span>
<span id="L73" rel="#L73">73</span>
<span id="L74" rel="#L74">74</span>
<span id="L75" rel="#L75">75</span>
<span id="L76" rel="#L76">76</span>
<span id="L77" rel="#L77">77</span>
<span id="L78" rel="#L78">78</span>
<span id="L79" rel="#L79">79</span>
<span id="L80" rel="#L80">80</span>
<span id="L81" rel="#L81">81</span>
<span id="L82" rel="#L82">82</span>
<span id="L83" rel="#L83">83</span>
<span id="L84" rel="#L84">84</span>
<span id="L85" rel="#L85">85</span>
<span id="L86" rel="#L86">86</span>
<span id="L87" rel="#L87">87</span>
<span id="L88" rel="#L88">88</span>
<span id="L89" rel="#L89">89</span>
<span id="L90" rel="#L90">90</span>
<span id="L91" rel="#L91">91</span>
<span id="L92" rel="#L92">92</span>
<span id="L93" rel="#L93">93</span>
<span id="L94" rel="#L94">94</span>
<span id="L95" rel="#L95">95</span>
<span id="L96" rel="#L96">96</span>
<span id="L97" rel="#L97">97</span>
<span id="L98" rel="#L98">98</span>
<span id="L99" rel="#L99">99</span>
<span id="L100" rel="#L100">100</span>
<span id="L101" rel="#L101">101</span>
<span id="L102" rel="#L102">102</span>
<span id="L103" rel="#L103">103</span>
<span id="L104" rel="#L104">104</span>
<span id="L105" rel="#L105">105</span>
<span id="L106" rel="#L106">106</span>
<span id="L107" rel="#L107">107</span>
<span id="L108" rel="#L108">108</span>
<span id="L109" rel="#L109">109</span>
<span id="L110" rel="#L110">110</span>
<span id="L111" rel="#L111">111</span>
<span id="L112" rel="#L112">112</span>
<span id="L113" rel="#L113">113</span>
<span id="L114" rel="#L114">114</span>
<span id="L115" rel="#L115">115</span>
<span id="L116" rel="#L116">116</span>
<span id="L117" rel="#L117">117</span>
<span id="L118" rel="#L118">118</span>
<span id="L119" rel="#L119">119</span>
<span id="L120" rel="#L120">120</span>
<span id="L121" rel="#L121">121</span>
<span id="L122" rel="#L122">122</span>
<span id="L123" rel="#L123">123</span>
<span id="L124" rel="#L124">124</span>
<span id="L125" rel="#L125">125</span>
<span id="L126" rel="#L126">126</span>
<span id="L127" rel="#L127">127</span>
<span id="L128" rel="#L128">128</span>
<span id="L129" rel="#L129">129</span>
<span id="L130" rel="#L130">130</span>
<span id="L131" rel="#L131">131</span>
<span id="L132" rel="#L132">132</span>
<span id="L133" rel="#L133">133</span>
<span id="L134" rel="#L134">134</span>
<span id="L135" rel="#L135">135</span>
<span id="L136" rel="#L136">136</span>
<span id="L137" rel="#L137">137</span>
<span id="L138" rel="#L138">138</span>
<span id="L139" rel="#L139">139</span>
<span id="L140" rel="#L140">140</span>
<span id="L141" rel="#L141">141</span>
<span id="L142" rel="#L142">142</span>
<span id="L143" rel="#L143">143</span>
<span id="L144" rel="#L144">144</span>
<span id="L145" rel="#L145">145</span>
<span id="L146" rel="#L146">146</span>
<span id="L147" rel="#L147">147</span>
<span id="L148" rel="#L148">148</span>
<span id="L149" rel="#L149">149</span>
<span id="L150" rel="#L150">150</span>
<span id="L151" rel="#L151">151</span>
<span id="L152" rel="#L152">152</span>
<span id="L153" rel="#L153">153</span>
<span id="L154" rel="#L154">154</span>
<span id="L155" rel="#L155">155</span>
<span id="L156" rel="#L156">156</span>
<span id="L157" rel="#L157">157</span>
<span id="L158" rel="#L158">158</span>
<span id="L159" rel="#L159">159</span>
<span id="L160" rel="#L160">160</span>
<span id="L161" rel="#L161">161</span>
<span id="L162" rel="#L162">162</span>
<span id="L163" rel="#L163">163</span>
<span id="L164" rel="#L164">164</span>
<span id="L165" rel="#L165">165</span>
<span id="L166" rel="#L166">166</span>
<span id="L167" rel="#L167">167</span>
<span id="L168" rel="#L168">168</span>
<span id="L169" rel="#L169">169</span>
<span id="L170" rel="#L170">170</span>
<span id="L171" rel="#L171">171</span>
<span id="L172" rel="#L172">172</span>
<span id="L173" rel="#L173">173</span>
<span id="L174" rel="#L174">174</span>
<span id="L175" rel="#L175">175</span>
<span id="L176" rel="#L176">176</span>
<span id="L177" rel="#L177">177</span>
<span id="L178" rel="#L178">178</span>
<span id="L179" rel="#L179">179</span>
<span id="L180" rel="#L180">180</span>
<span id="L181" rel="#L181">181</span>
<span id="L182" rel="#L182">182</span>
<span id="L183" rel="#L183">183</span>
<span id="L184" rel="#L184">184</span>
<span id="L185" rel="#L185">185</span>
<span id="L186" rel="#L186">186</span>
<span id="L187" rel="#L187">187</span>
<span id="L188" rel="#L188">188</span>
<span id="L189" rel="#L189">189</span>
<span id="L190" rel="#L190">190</span>
<span id="L191" rel="#L191">191</span>
<span id="L192" rel="#L192">192</span>
<span id="L193" rel="#L193">193</span>
<span id="L194" rel="#L194">194</span>
<span id="L195" rel="#L195">195</span>
<span id="L196" rel="#L196">196</span>
<span id="L197" rel="#L197">197</span>
<span id="L198" rel="#L198">198</span>
<span id="L199" rel="#L199">199</span>
<span id="L200" rel="#L200">200</span>
<span id="L201" rel="#L201">201</span>
<span id="L202" rel="#L202">202</span>
<span id="L203" rel="#L203">203</span>
<span id="L204" rel="#L204">204</span>
<span id="L205" rel="#L205">205</span>
<span id="L206" rel="#L206">206</span>
<span id="L207" rel="#L207">207</span>
<span id="L208" rel="#L208">208</span>
<span id="L209" rel="#L209">209</span>
<span id="L210" rel="#L210">210</span>
<span id="L211" rel="#L211">211</span>
<span id="L212" rel="#L212">212</span>
<span id="L213" rel="#L213">213</span>
<span id="L214" rel="#L214">214</span>
<span id="L215" rel="#L215">215</span>
<span id="L216" rel="#L216">216</span>
<span id="L217" rel="#L217">217</span>
<span id="L218" rel="#L218">218</span>
<span id="L219" rel="#L219">219</span>
<span id="L220" rel="#L220">220</span>
<span id="L221" rel="#L221">221</span>
<span id="L222" rel="#L222">222</span>
<span id="L223" rel="#L223">223</span>
<span id="L224" rel="#L224">224</span>
<span id="L225" rel="#L225">225</span>
<span id="L226" rel="#L226">226</span>
<span id="L227" rel="#L227">227</span>
<span id="L228" rel="#L228">228</span>
<span id="L229" rel="#L229">229</span>
<span id="L230" rel="#L230">230</span>
<span id="L231" rel="#L231">231</span>
<span id="L232" rel="#L232">232</span>
<span id="L233" rel="#L233">233</span>
<span id="L234" rel="#L234">234</span>
<span id="L235" rel="#L235">235</span>
<span id="L236" rel="#L236">236</span>
<span id="L237" rel="#L237">237</span>
<span id="L238" rel="#L238">238</span>
<span id="L239" rel="#L239">239</span>
<span id="L240" rel="#L240">240</span>
<span id="L241" rel="#L241">241</span>
<span id="L242" rel="#L242">242</span>
<span id="L243" rel="#L243">243</span>
<span id="L244" rel="#L244">244</span>
<span id="L245" rel="#L245">245</span>
<span id="L246" rel="#L246">246</span>
<span id="L247" rel="#L247">247</span>
<span id="L248" rel="#L248">248</span>
<span id="L249" rel="#L249">249</span>
<span id="L250" rel="#L250">250</span>
<span id="L251" rel="#L251">251</span>
<span id="L252" rel="#L252">252</span>
<span id="L253" rel="#L253">253</span>
<span id="L254" rel="#L254">254</span>
<span id="L255" rel="#L255">255</span>
<span id="L256" rel="#L256">256</span>
<span id="L257" rel="#L257">257</span>
<span id="L258" rel="#L258">258</span>
<span id="L259" rel="#L259">259</span>
<span id="L260" rel="#L260">260</span>
<span id="L261" rel="#L261">261</span>
<span id="L262" rel="#L262">262</span>
<span id="L263" rel="#L263">263</span>
<span id="L264" rel="#L264">264</span>
<span id="L265" rel="#L265">265</span>
<span id="L266" rel="#L266">266</span>
<span id="L267" rel="#L267">267</span>
<span id="L268" rel="#L268">268</span>
<span id="L269" rel="#L269">269</span>
<span id="L270" rel="#L270">270</span>
<span id="L271" rel="#L271">271</span>
<span id="L272" rel="#L272">272</span>
<span id="L273" rel="#L273">273</span>
<span id="L274" rel="#L274">274</span>
<span id="L275" rel="#L275">275</span>
<span id="L276" rel="#L276">276</span>
<span id="L277" rel="#L277">277</span>
<span id="L278" rel="#L278">278</span>
<span id="L279" rel="#L279">279</span>
<span id="L280" rel="#L280">280</span>
<span id="L281" rel="#L281">281</span>
<span id="L282" rel="#L282">282</span>
<span id="L283" rel="#L283">283</span>
<span id="L284" rel="#L284">284</span>
<span id="L285" rel="#L285">285</span>
<span id="L286" rel="#L286">286</span>
<span id="L287" rel="#L287">287</span>
<span id="L288" rel="#L288">288</span>
<span id="L289" rel="#L289">289</span>
<span id="L290" rel="#L290">290</span>
<span id="L291" rel="#L291">291</span>
<span id="L292" rel="#L292">292</span>
<span id="L293" rel="#L293">293</span>
<span id="L294" rel="#L294">294</span>
<span id="L295" rel="#L295">295</span>
<span id="L296" rel="#L296">296</span>
<span id="L297" rel="#L297">297</span>
<span id="L298" rel="#L298">298</span>
<span id="L299" rel="#L299">299</span>
<span id="L300" rel="#L300">300</span>
<span id="L301" rel="#L301">301</span>
<span id="L302" rel="#L302">302</span>
<span id="L303" rel="#L303">303</span>
<span id="L304" rel="#L304">304</span>
<span id="L305" rel="#L305">305</span>
<span id="L306" rel="#L306">306</span>
<span id="L307" rel="#L307">307</span>
<span id="L308" rel="#L308">308</span>
<span id="L309" rel="#L309">309</span>
<span id="L310" rel="#L310">310</span>
<span id="L311" rel="#L311">311</span>
<span id="L312" rel="#L312">312</span>
<span id="L313" rel="#L313">313</span>
<span id="L314" rel="#L314">314</span>
<span id="L315" rel="#L315">315</span>
<span id="L316" rel="#L316">316</span>
<span id="L317" rel="#L317">317</span>
<span id="L318" rel="#L318">318</span>
<span id="L319" rel="#L319">319</span>
<span id="L320" rel="#L320">320</span>
<span id="L321" rel="#L321">321</span>
<span id="L322" rel="#L322">322</span>
<span id="L323" rel="#L323">323</span>
<span id="L324" rel="#L324">324</span>
<span id="L325" rel="#L325">325</span>
<span id="L326" rel="#L326">326</span>
<span id="L327" rel="#L327">327</span>
<span id="L328" rel="#L328">328</span>
<span id="L329" rel="#L329">329</span>
<span id="L330" rel="#L330">330</span>
<span id="L331" rel="#L331">331</span>
<span id="L332" rel="#L332">332</span>
<span id="L333" rel="#L333">333</span>
<span id="L334" rel="#L334">334</span>
<span id="L335" rel="#L335">335</span>
<span id="L336" rel="#L336">336</span>
<span id="L337" rel="#L337">337</span>
<span id="L338" rel="#L338">338</span>
<span id="L339" rel="#L339">339</span>
<span id="L340" rel="#L340">340</span>
<span id="L341" rel="#L341">341</span>
<span id="L342" rel="#L342">342</span>
<span id="L343" rel="#L343">343</span>
<span id="L344" rel="#L344">344</span>
<span id="L345" rel="#L345">345</span>
<span id="L346" rel="#L346">346</span>
<span id="L347" rel="#L347">347</span>
<span id="L348" rel="#L348">348</span>
<span id="L349" rel="#L349">349</span>
<span id="L350" rel="#L350">350</span>
<span id="L351" rel="#L351">351</span>
<span id="L352" rel="#L352">352</span>
<span id="L353" rel="#L353">353</span>
<span id="L354" rel="#L354">354</span>
<span id="L355" rel="#L355">355</span>
<span id="L356" rel="#L356">356</span>
<span id="L357" rel="#L357">357</span>
<span id="L358" rel="#L358">358</span>
<span id="L359" rel="#L359">359</span>
<span id="L360" rel="#L360">360</span>
<span id="L361" rel="#L361">361</span>
<span id="L362" rel="#L362">362</span>
<span id="L363" rel="#L363">363</span>
<span id="L364" rel="#L364">364</span>
<span id="L365" rel="#L365">365</span>
<span id="L366" rel="#L366">366</span>
<span id="L367" rel="#L367">367</span>
<span id="L368" rel="#L368">368</span>
<span id="L369" rel="#L369">369</span>
<span id="L370" rel="#L370">370</span>
<span id="L371" rel="#L371">371</span>
<span id="L372" rel="#L372">372</span>
<span id="L373" rel="#L373">373</span>
<span id="L374" rel="#L374">374</span>
<span id="L375" rel="#L375">375</span>
<span id="L376" rel="#L376">376</span>
<span id="L377" rel="#L377">377</span>
<span id="L378" rel="#L378">378</span>
<span id="L379" rel="#L379">379</span>
<span id="L380" rel="#L380">380</span>
<span id="L381" rel="#L381">381</span>
<span id="L382" rel="#L382">382</span>
<span id="L383" rel="#L383">383</span>
<span id="L384" rel="#L384">384</span>
<span id="L385" rel="#L385">385</span>
<span id="L386" rel="#L386">386</span>
<span id="L387" rel="#L387">387</span>
<span id="L388" rel="#L388">388</span>
<span id="L389" rel="#L389">389</span>
<span id="L390" rel="#L390">390</span>
<span id="L391" rel="#L391">391</span>
<span id="L392" rel="#L392">392</span>
<span id="L393" rel="#L393">393</span>
<span id="L394" rel="#L394">394</span>
<span id="L395" rel="#L395">395</span>
<span id="L396" rel="#L396">396</span>
<span id="L397" rel="#L397">397</span>
<span id="L398" rel="#L398">398</span>
<span id="L399" rel="#L399">399</span>
<span id="L400" rel="#L400">400</span>
<span id="L401" rel="#L401">401</span>
<span id="L402" rel="#L402">402</span>
<span id="L403" rel="#L403">403</span>
<span id="L404" rel="#L404">404</span>
<span id="L405" rel="#L405">405</span>
<span id="L406" rel="#L406">406</span>
<span id="L407" rel="#L407">407</span>
<span id="L408" rel="#L408">408</span>
<span id="L409" rel="#L409">409</span>
<span id="L410" rel="#L410">410</span>
<span id="L411" rel="#L411">411</span>
<span id="L412" rel="#L412">412</span>
<span id="L413" rel="#L413">413</span>
<span id="L414" rel="#L414">414</span>
<span id="L415" rel="#L415">415</span>
<span id="L416" rel="#L416">416</span>
<span id="L417" rel="#L417">417</span>
<span id="L418" rel="#L418">418</span>
<span id="L419" rel="#L419">419</span>
<span id="L420" rel="#L420">420</span>
<span id="L421" rel="#L421">421</span>
<span id="L422" rel="#L422">422</span>
<span id="L423" rel="#L423">423</span>
<span id="L424" rel="#L424">424</span>
<span id="L425" rel="#L425">425</span>
<span id="L426" rel="#L426">426</span>
<span id="L427" rel="#L427">427</span>
<span id="L428" rel="#L428">428</span>
<span id="L429" rel="#L429">429</span>
<span id="L430" rel="#L430">430</span>
<span id="L431" rel="#L431">431</span>
<span id="L432" rel="#L432">432</span>
<span id="L433" rel="#L433">433</span>
<span id="L434" rel="#L434">434</span>
<span id="L435" rel="#L435">435</span>
<span id="L436" rel="#L436">436</span>
<span id="L437" rel="#L437">437</span>
<span id="L438" rel="#L438">438</span>
<span id="L439" rel="#L439">439</span>
<span id="L440" rel="#L440">440</span>
<span id="L441" rel="#L441">441</span>
<span id="L442" rel="#L442">442</span>
<span id="L443" rel="#L443">443</span>
<span id="L444" rel="#L444">444</span>
<span id="L445" rel="#L445">445</span>
<span id="L446" rel="#L446">446</span>
<span id="L447" rel="#L447">447</span>
<span id="L448" rel="#L448">448</span>
<span id="L449" rel="#L449">449</span>
<span id="L450" rel="#L450">450</span>
<span id="L451" rel="#L451">451</span>
<span id="L452" rel="#L452">452</span>
<span id="L453" rel="#L453">453</span>
<span id="L454" rel="#L454">454</span>
<span id="L455" rel="#L455">455</span>
<span id="L456" rel="#L456">456</span>
<span id="L457" rel="#L457">457</span>
<span id="L458" rel="#L458">458</span>
<span id="L459" rel="#L459">459</span>
<span id="L460" rel="#L460">460</span>
<span id="L461" rel="#L461">461</span>
<span id="L462" rel="#L462">462</span>
<span id="L463" rel="#L463">463</span>
<span id="L464" rel="#L464">464</span>
<span id="L465" rel="#L465">465</span>
<span id="L466" rel="#L466">466</span>
<span id="L467" rel="#L467">467</span>
<span id="L468" rel="#L468">468</span>
<span id="L469" rel="#L469">469</span>
<span id="L470" rel="#L470">470</span>
<span id="L471" rel="#L471">471</span>
<span id="L472" rel="#L472">472</span>
<span id="L473" rel="#L473">473</span>
<span id="L474" rel="#L474">474</span>
<span id="L475" rel="#L475">475</span>
<span id="L476" rel="#L476">476</span>
<span id="L477" rel="#L477">477</span>
<span id="L478" rel="#L478">478</span>
<span id="L479" rel="#L479">479</span>
<span id="L480" rel="#L480">480</span>
<span id="L481" rel="#L481">481</span>
<span id="L482" rel="#L482">482</span>
<span id="L483" rel="#L483">483</span>
<span id="L484" rel="#L484">484</span>
<span id="L485" rel="#L485">485</span>
<span id="L486" rel="#L486">486</span>
<span id="L487" rel="#L487">487</span>
<span id="L488" rel="#L488">488</span>
<span id="L489" rel="#L489">489</span>
<span id="L490" rel="#L490">490</span>
</pre>
          </td>
          <td width="100%">
            
              
                <div class="highlight"><pre><div class='line' id='LC1'><span class="cp">&lt;?php</span></div><div class='line' id='LC2'><span class="sd">/**</span></div><div class='line' id='LC3'><span class="sd">* FileUpload Component</span></div><div class='line' id='LC4'><span class="sd">*</span></div><div class='line' id='LC5'><span class="sd">* Manages uploaded files to be saved to the file system.</span></div><div class='line' id='LC6'><span class="sd">*</span></div><div class='line' id='LC7'><span class="sd">* @copyright    Copyright 2009, Webtechnick</span></div><div class='line' id='LC8'><span class="sd">* @link         http://www.webtechnick.com</span></div><div class='line' id='LC9'><span class="sd">* @author       Nick Baker</span></div><div class='line' id='LC10'><span class="sd">* @version      4.0.4</span></div><div class='line' id='LC11'><span class="sd">* @license      MIT</span></div><div class='line' id='LC12'><span class="sd">*/</span></div><div class='line' id='LC13'><span class="nx">App</span><span class="o">::</span><span class="na">import</span><span class="p">(</span><span class="s1">&#39;Vendor&#39;</span><span class="p">,</span> <span class="s1">&#39;FileUpload.uploader&#39;</span><span class="p">);</span></div><div class='line' id='LC14'><span class="nx">App</span><span class="o">::</span><span class="na">import</span><span class="p">(</span><span class="s1">&#39;Config&#39;</span><span class="p">,</span> <span class="s1">&#39;FileUpload.file_upload_settings&#39;</span><span class="p">);</span></div><div class='line' id='LC15'><span class="k">class</span> <span class="nc">FileUploadComponent</span> <span class="k">extends</span> <span class="nx">Object</span><span class="p">{</span></div><div class='line' id='LC16'>&nbsp;&nbsp;<span class="sd">/**</span></div><div class='line' id='LC17'><span class="sd">    * options are the default options that will be used</span></div><div class='line' id='LC18'><span class="sd">    * </span></div><div class='line' id='LC19'><span class="sd">    * Settings in config/file_upload_settings.php</span></div><div class='line' id='LC20'><span class="sd">    */</span></div><div class='line' id='LC21'>&nbsp;&nbsp;<span class="k">var</span> <span class="nv">$options</span> <span class="o">=</span> <span class="k">array</span><span class="p">();</span></div><div class='line' id='LC22'>&nbsp;&nbsp;</div><div class='line' id='LC23'>&nbsp;&nbsp;<span class="sd">/**</span></div><div class='line' id='LC24'><span class="sd">    * Uploader</span></div><div class='line' id='LC25'><span class="sd">    */</span></div><div class='line' id='LC26'>&nbsp;&nbsp;<span class="k">var</span> <span class="nv">$Uploader</span> <span class="o">=</span> <span class="k">null</span><span class="p">;</span></div><div class='line' id='LC27'>&nbsp;&nbsp;</div><div class='line' id='LC28'>&nbsp;&nbsp;<span class="sd">/**</span></div><div class='line' id='LC29'><span class="sd">    * uploadDetected will be true if an upload is detected even</span></div><div class='line' id='LC30'><span class="sd">    * if it can&#39;t be processed due to misconfiguration</span></div><div class='line' id='LC31'><span class="sd">    *</span></div><div class='line' id='LC32'><span class="sd">    * @var boolean</span></div><div class='line' id='LC33'><span class="sd">    * @access public</span></div><div class='line' id='LC34'><span class="sd">    */</span></div><div class='line' id='LC35'>&nbsp;&nbsp;<span class="k">var</span> <span class="nv">$uploadDetected</span> <span class="o">=</span> <span class="k">false</span><span class="p">;</span></div><div class='line' id='LC36'>&nbsp;&nbsp;</div><div class='line' id='LC37'>&nbsp;&nbsp;<span class="sd">/**</span></div><div class='line' id='LC38'><span class="sd">    * uploadedFiles will hold the uploadedFiles array if there is one, or multiple</span></div><div class='line' id='LC39'><span class="sd">    *</span></div><div class='line' id='LC40'><span class="sd">    * @var boolean|array</span></div><div class='line' id='LC41'><span class="sd">    * @access public</span></div><div class='line' id='LC42'><span class="sd">    */</span></div><div class='line' id='LC43'>&nbsp;&nbsp;<span class="k">var</span> <span class="nv">$uploadedFiles</span> <span class="o">=</span> <span class="k">false</span><span class="p">;</span></div><div class='line' id='LC44'>&nbsp;&nbsp;</div><div class='line' id='LC45'>&nbsp;&nbsp;<span class="sd">/**</span></div><div class='line' id='LC46'><span class="sd">    * currentFile will hold the currentFile being used array if there is one</span></div><div class='line' id='LC47'><span class="sd">    *</span></div><div class='line' id='LC48'><span class="sd">    * @var boolean|array</span></div><div class='line' id='LC49'><span class="sd">    * @access public</span></div><div class='line' id='LC50'><span class="sd">    */</span></div><div class='line' id='LC51'>&nbsp;&nbsp;<span class="k">var</span> <span class="nv">$currentFile</span> <span class="o">=</span> <span class="k">false</span><span class="p">;</span></div><div class='line' id='LC52'>&nbsp;&nbsp;</div><div class='line' id='LC53'>&nbsp;&nbsp;<span class="sd">/**</span></div><div class='line' id='LC54'><span class="sd">   * hasFile will be true if an upload is pending and needs to be processed</span></div><div class='line' id='LC55'><span class="sd">   * </span></div><div class='line' id='LC56'><span class="sd">   * @contributer Elmer (http://bakery.cakephp.org/articles/view/file-upload-component-w-automagic-model-optional)</span></div><div class='line' id='LC57'><span class="sd">   * @var boolean</span></div><div class='line' id='LC58'><span class="sd">   * @access public</span></div><div class='line' id='LC59'><span class="sd">   */</span></div><div class='line' id='LC60'>&nbsp;&nbsp;<span class="k">var</span> <span class="nv">$hasFile</span> <span class="o">=</span> <span class="k">false</span><span class="p">;</span></div><div class='line' id='LC61'>&nbsp;&nbsp;</div><div class='line' id='LC62'>&nbsp;&nbsp;<span class="sd">/**</span></div><div class='line' id='LC63'><span class="sd">    * data and params are the controller data and params</span></div><div class='line' id='LC64'><span class="sd">    *</span></div><div class='line' id='LC65'><span class="sd">    * @var array</span></div><div class='line' id='LC66'><span class="sd">    * @access public</span></div><div class='line' id='LC67'><span class="sd">    */</span></div><div class='line' id='LC68'>&nbsp;&nbsp;<span class="k">var</span> <span class="nv">$data</span> <span class="o">=</span> <span class="k">array</span><span class="p">();</span></div><div class='line' id='LC69'>&nbsp;&nbsp;<span class="k">var</span> <span class="nv">$params</span> <span class="o">=</span> <span class="k">array</span><span class="p">();</span></div><div class='line' id='LC70'>&nbsp;&nbsp;</div><div class='line' id='LC71'>&nbsp;&nbsp;<span class="sd">/**</span></div><div class='line' id='LC72'><span class="sd">    * Final file is set on move_uploadedFile success.</span></div><div class='line' id='LC73'><span class="sd">    * This is the file name of the final file that was uploaded</span></div><div class='line' id='LC74'><span class="sd">    * to the uploadDir directory.</span></div><div class='line' id='LC75'><span class="sd">    *</span></div><div class='line' id='LC76'><span class="sd">    * @var array of strings showing the final file name</span></div><div class='line' id='LC77'><span class="sd">    * @access public</span></div><div class='line' id='LC78'><span class="sd">    */</span></div><div class='line' id='LC79'>&nbsp;&nbsp;<span class="k">var</span> <span class="nv">$finalFiles</span> <span class="o">=</span> <span class="k">array</span><span class="p">();</span></div><div class='line' id='LC80'>&nbsp;&nbsp;</div><div class='line' id='LC81'>&nbsp;&nbsp;<span class="sd">/**</span></div><div class='line' id='LC82'><span class="sd">    * success is set if we have a fileModel and there was a successful save</span></div><div class='line' id='LC83'><span class="sd">    * or if we don&#39;t have a fileModel and there was a successful file uploaded.</span></div><div class='line' id='LC84'><span class="sd">    *</span></div><div class='line' id='LC85'><span class="sd">    * @var boolean</span></div><div class='line' id='LC86'><span class="sd">    * @access public</span></div><div class='line' id='LC87'><span class="sd">    */</span></div><div class='line' id='LC88'>&nbsp;&nbsp;<span class="k">var</span> <span class="nv">$success</span> <span class="o">=</span> <span class="k">false</span><span class="p">;</span></div><div class='line' id='LC89'>&nbsp;&nbsp;</div><div class='line' id='LC90'>&nbsp;&nbsp;<span class="sd">/**</span></div><div class='line' id='LC91'><span class="sd">    * uploadIds is the final database ids saved when files are detected</span></div><div class='line' id='LC92'><span class="sd">    * @var array of ids of single or multiple files uploaded</span></div><div class='line' id='LC93'><span class="sd">    * @access public</span></div><div class='line' id='LC94'><span class="sd">    */</span></div><div class='line' id='LC95'>&nbsp;&nbsp;<span class="k">var</span> <span class="nv">$uploadIds</span> <span class="o">=</span> <span class="k">array</span><span class="p">();</span></div><div class='line' id='LC96'>&nbsp;&nbsp;</div><div class='line' id='LC97'>&nbsp;&nbsp;<span class="sd">/**</span></div><div class='line' id='LC98'><span class="sd">    * errors holds any errors that occur as string values.</span></div><div class='line' id='LC99'><span class="sd">    * this can be access to debug the FileUploadComponent</span></div><div class='line' id='LC100'><span class="sd">    *</span></div><div class='line' id='LC101'><span class="sd">    * @var array</span></div><div class='line' id='LC102'><span class="sd">    * @access public</span></div><div class='line' id='LC103'><span class="sd">    */</span></div><div class='line' id='LC104'>&nbsp;&nbsp;<span class="k">var</span> <span class="nv">$errors</span> <span class="o">=</span> <span class="k">array</span><span class="p">();</span></div><div class='line' id='LC105'>&nbsp;&nbsp;</div><div class='line' id='LC106'>&nbsp;&nbsp;<span class="sd">/**</span></div><div class='line' id='LC107'><span class="sd">    * Overloaded call method</span></div><div class='line' id='LC108'><span class="sd">    *</span></div><div class='line' id='LC109'><span class="sd">    * @param string $method Name of method called</span></div><div class='line' id='LC110'><span class="sd">    * @param mixed $params Params for method.</span></div><div class='line' id='LC111'><span class="sd">    * @return mixed</span></div><div class='line' id='LC112'><span class="sd">    */</span></div><div class='line' id='LC113'>&nbsp;&nbsp;<span class="k">function</span> <span class="nf">__call</span><span class="p">(</span><span class="nv">$method</span><span class="p">,</span> <span class="nv">$params</span><span class="p">){</span></div><div class='line' id='LC114'>&nbsp;&nbsp;&nbsp;&nbsp;<span class="k">if</span><span class="p">(</span><span class="nx">key_exists</span><span class="p">(</span><span class="nv">$method</span><span class="p">,</span> <span class="nv">$this</span><span class="o">-&gt;</span><span class="na">options</span><span class="p">)){</span></div><div class='line' id='LC115'>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span class="nb">array_unshift</span><span class="p">(</span><span class="nv">$params</span><span class="p">,</span> <span class="nv">$method</span><span class="p">);</span></div><div class='line' id='LC116'>			<span class="k">return</span> <span class="nv">$this</span><span class="o">-&gt;</span><span class="na">dispatchMethod</span><span class="p">(</span><span class="s1">&#39;attr&#39;</span><span class="p">,</span> <span class="nv">$params</span><span class="p">);</span></div><div class='line' id='LC117'>&nbsp;&nbsp;&nbsp;&nbsp;<span class="p">}</span></div><div class='line' id='LC118'>&nbsp;&nbsp;<span class="p">}</span></div><div class='line' id='LC119'>&nbsp;&nbsp;</div><div class='line' id='LC120'>&nbsp;&nbsp;<span class="sd">/**</span></div><div class='line' id='LC121'><span class="sd">    * attr will take a name, if only the name is given it will return the corresponding options</span></div><div class='line' id='LC122'><span class="sd">    * if a value is given it will set the option to the given value.</span></div><div class='line' id='LC123'><span class="sd">    *</span></div><div class='line' id='LC124'><span class="sd">    * @param string name of the given option</span></div><div class='line' id='LC125'><span class="sd">    * @param string value to set to name option, if null, return option&#39;s value</span></div><div class='line' id='LC126'><span class="sd">    * @return mixed option on key name, or void if setting</span></div><div class='line' id='LC127'><span class="sd">    */</span></div><div class='line' id='LC128'>&nbsp;&nbsp;<span class="k">function</span> <span class="nf">attr</span><span class="p">(</span><span class="nv">$name</span><span class="p">,</span> <span class="nv">$values</span> <span class="o">=</span> <span class="k">null</span><span class="p">){</span></div><div class='line' id='LC129'>&nbsp;&nbsp;&nbsp;&nbsp;<span class="k">if</span><span class="p">(</span><span class="nx">key_exists</span><span class="p">(</span><span class="nv">$name</span><span class="p">,</span> <span class="nv">$this</span><span class="o">-&gt;</span><span class="na">options</span><span class="p">)){</span></div><div class='line' id='LC130'>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span class="k">if</span><span class="p">(</span><span class="nb">func_num_args</span><span class="p">()</span> <span class="o">&gt;</span> <span class="m">1</span><span class="p">){</span></div><div class='line' id='LC131'>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span class="nv">$this</span><span class="o">-&gt;</span><span class="na">options</span><span class="p">[</span><span class="nv">$name</span><span class="p">]</span> <span class="o">=</span> <span class="nv">$values</span><span class="p">;</span></div><div class='line' id='LC132'>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span class="p">}</span></div><div class='line' id='LC133'>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span class="k">else</span> <span class="p">{</span></div><div class='line' id='LC134'>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span class="k">return</span> <span class="nv">$this</span><span class="o">-&gt;</span><span class="na">options</span><span class="p">[</span><span class="nv">$name</span><span class="p">];</span></div><div class='line' id='LC135'>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span class="p">}</span></div><div class='line' id='LC136'>&nbsp;&nbsp;&nbsp;&nbsp;<span class="p">}</span></div><div class='line' id='LC137'>&nbsp;&nbsp;&nbsp;&nbsp;<span class="k">else</span> <span class="p">{</span></div><div class='line' id='LC138'>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span class="nv">$this</span><span class="o">-&gt;</span><span class="na">_error</span><span class="p">(</span><span class="s2">&quot;Unknown option: </span><span class="si">$name</span><span class="s2">&quot;</span><span class="p">);</span></div><div class='line' id='LC139'>&nbsp;&nbsp;&nbsp;&nbsp;<span class="p">}</span></div><div class='line' id='LC140'>&nbsp;&nbsp;<span class="p">}</span></div><div class='line' id='LC141'><br/></div><div class='line' id='LC142'>&nbsp;&nbsp;<span class="sd">/**</span></div><div class='line' id='LC143'><span class="sd">    * Initializes FileUploadComponent for use in the controller</span></div><div class='line' id='LC144'><span class="sd">    *</span></div><div class='line' id='LC145'><span class="sd">    * @param object $controller A reference to the instantiating controller object</span></div><div class='line' id='LC146'><span class="sd">    * @return void</span></div><div class='line' id='LC147'><span class="sd">    * @access public</span></div><div class='line' id='LC148'><span class="sd">    */</span></div><div class='line' id='LC149'>&nbsp;&nbsp;<span class="k">function</span> <span class="nf">initialize</span><span class="p">(</span><span class="o">&amp;</span><span class="nv">$controller</span><span class="p">){</span></div><div class='line' id='LC150'>&nbsp;&nbsp;&nbsp;&nbsp;<span class="nv">$this</span><span class="o">-&gt;</span><span class="na">data</span> <span class="o">=</span> <span class="nv">$controller</span><span class="o">-&gt;</span><span class="na">data</span><span class="p">;</span></div><div class='line' id='LC151'>&nbsp;&nbsp;&nbsp;&nbsp;<span class="nv">$this</span><span class="o">-&gt;</span><span class="na">params</span> <span class="o">=</span> <span class="nv">$controller</span><span class="o">-&gt;</span><span class="na">params</span><span class="p">;</span></div><div class='line' id='LC152'>&nbsp;&nbsp;&nbsp;&nbsp;</div><div class='line' id='LC153'>&nbsp;&nbsp;&nbsp;&nbsp;<span class="nv">$FileUploadSettings</span> <span class="o">=</span> <span class="k">new</span> <span class="nx">FileUploadSettings</span><span class="p">;</span></div><div class='line' id='LC154'>&nbsp;&nbsp;&nbsp;&nbsp;<span class="nv">$this</span><span class="o">-&gt;</span><span class="na">options</span> <span class="o">=</span> <span class="nb">array_merge</span><span class="p">(</span><span class="nv">$FileUploadSettings</span><span class="o">-&gt;</span><span class="na">defaults</span><span class="p">,</span> <span class="nv">$this</span><span class="o">-&gt;</span><span class="na">options</span><span class="p">);</span></div><div class='line' id='LC155'>&nbsp;&nbsp;&nbsp;&nbsp;</div><div class='line' id='LC156'>&nbsp;&nbsp;<span class="p">}</span></div><div class='line' id='LC157'>&nbsp;&nbsp;</div><div class='line' id='LC158'>&nbsp;&nbsp;<span class="sd">/**</span></div><div class='line' id='LC159'><span class="sd">    * Main execution method.  Handles file upload automatically upon detection and verification.</span></div><div class='line' id='LC160'><span class="sd">    *</span></div><div class='line' id='LC161'><span class="sd">    * @param object $controller A reference to the instantiating controller object</span></div><div class='line' id='LC162'><span class="sd">    * @return void</span></div><div class='line' id='LC163'><span class="sd">    * @access public</span></div><div class='line' id='LC164'><span class="sd">    */</span></div><div class='line' id='LC165'>&nbsp;&nbsp;<span class="k">function</span> <span class="nf">startup</span><span class="p">(</span><span class="o">&amp;</span><span class="nv">$controller</span><span class="p">){</span></div><div class='line' id='LC166'>&nbsp;&nbsp;&nbsp;&nbsp;<span class="c1">//Backporting 4.0 to 3.6.3 //using setting attributes is now deprecated.</span></div><div class='line' id='LC167'>&nbsp;&nbsp;&nbsp;&nbsp;<span class="nv">$this</span><span class="o">-&gt;</span><span class="na">fileModel</span> <span class="o">=</span> <span class="nv">$this</span><span class="o">-&gt;</span><span class="na">fileModel</span><span class="p">();</span></div><div class='line' id='LC168'>&nbsp;&nbsp;&nbsp;&nbsp;<span class="nv">$this</span><span class="o">-&gt;</span><span class="na">fileVar</span> <span class="o">=</span> <span class="nv">$this</span><span class="o">-&gt;</span><span class="na">fileVar</span><span class="p">();</span></div><div class='line' id='LC169'>&nbsp;&nbsp;&nbsp;&nbsp;<span class="nv">$this</span><span class="o">-&gt;</span><span class="na">uploadDir</span> <span class="o">=</span> <span class="nv">$this</span><span class="o">-&gt;</span><span class="na">uploadDir</span><span class="p">();</span></div><div class='line' id='LC170'>&nbsp;&nbsp;&nbsp;&nbsp;<span class="nv">$this</span><span class="o">-&gt;</span><span class="na">allowedTypes</span> <span class="o">=</span> <span class="nv">$this</span><span class="o">-&gt;</span><span class="na">allowedTypes</span><span class="p">();</span></div><div class='line' id='LC171'>&nbsp;&nbsp;&nbsp;&nbsp;<span class="nv">$this</span><span class="o">-&gt;</span><span class="na">fields</span> <span class="o">=</span> <span class="nv">$this</span><span class="o">-&gt;</span><span class="na">fields</span><span class="p">();</span></div><div class='line' id='LC172'>&nbsp;&nbsp;&nbsp;&nbsp;<span class="nv">$this</span><span class="o">-&gt;</span><span class="na">massSave</span> <span class="o">=</span> <span class="nv">$this</span><span class="o">-&gt;</span><span class="na">massSave</span><span class="p">();</span></div><div class='line' id='LC173'>&nbsp;&nbsp;&nbsp;&nbsp;<span class="nv">$this</span><span class="o">-&gt;</span><span class="na">automatic</span> <span class="o">=</span> <span class="nv">$this</span><span class="o">-&gt;</span><span class="na">automatic</span><span class="p">();</span></div><div class='line' id='LC174'>&nbsp;&nbsp;&nbsp;&nbsp;</div><div class='line' id='LC175'>&nbsp;&nbsp;&nbsp;&nbsp;<span class="nv">$uploader_settings</span> <span class="o">=</span> <span class="nv">$this</span><span class="o">-&gt;</span><span class="na">options</span><span class="p">;</span></div><div class='line' id='LC176'>&nbsp;&nbsp;&nbsp;&nbsp;<span class="nv">$uploader_settings</span><span class="p">[</span><span class="s1">&#39;uploadDir&#39;</span><span class="p">]</span> <span class="o">=</span> <span class="nv">$this</span><span class="o">-&gt;</span><span class="na">options</span><span class="p">[</span><span class="s1">&#39;forceWebroot&#39;</span><span class="p">]</span> <span class="o">?</span> <span class="nx">WWW_ROOT</span> <span class="o">.</span> <span class="nv">$uploader_settings</span><span class="p">[</span><span class="s1">&#39;uploadDir&#39;</span><span class="p">]</span> <span class="o">:</span> <span class="nv">$uploader_settings</span><span class="p">[</span><span class="s1">&#39;uploadDir&#39;</span><span class="p">];</span> </div><div class='line' id='LC177'>&nbsp;&nbsp;&nbsp;&nbsp;<span class="nv">$this</span><span class="o">-&gt;</span><span class="na">Uploader</span> <span class="o">=</span> <span class="k">new</span> <span class="nx">Uploader</span><span class="p">(</span><span class="nv">$uploader_settings</span><span class="p">);</span></div><div class='line' id='LC178'>&nbsp;&nbsp;&nbsp;&nbsp;</div><div class='line' id='LC179'>&nbsp;&nbsp;&nbsp;&nbsp;<span class="nv">$this</span><span class="o">-&gt;</span><span class="na">uploadDetected</span> <span class="o">=</span> <span class="p">(</span><span class="nv">$this</span><span class="o">-&gt;</span><span class="na">_multiArrayKeyExists</span><span class="p">(</span><span class="s2">&quot;tmp_name&quot;</span><span class="p">,</span> <span class="nv">$this</span><span class="o">-&gt;</span><span class="na">data</span><span class="p">)</span> <span class="o">||</span> <span class="nv">$this</span><span class="o">-&gt;</span><span class="na">_multiArrayKeyExists</span><span class="p">(</span><span class="s2">&quot;tmp_name&quot;</span><span class="p">,</span><span class="nv">$this</span><span class="o">-&gt;</span><span class="na">params</span><span class="p">));</span></div><div class='line' id='LC180'>&nbsp;&nbsp;&nbsp;&nbsp;<span class="nv">$this</span><span class="o">-&gt;</span><span class="na">uploadedFiles</span> <span class="o">=</span> <span class="nv">$this</span><span class="o">-&gt;</span><span class="na">_uploadedFilesArray</span><span class="p">();</span></div><div class='line' id='LC181'>&nbsp;&nbsp;&nbsp;&nbsp;</div><div class='line' id='LC182'>&nbsp;&nbsp;&nbsp;&nbsp;<span class="k">if</span><span class="p">(</span><span class="nv">$this</span><span class="o">-&gt;</span><span class="na">uploadDetected</span><span class="p">){</span></div><div class='line' id='LC183'>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span class="nv">$this</span><span class="o">-&gt;</span><span class="na">hasFile</span> <span class="o">=</span> <span class="k">true</span><span class="p">;</span></div><div class='line' id='LC184'>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span class="k">if</span><span class="p">(</span><span class="nv">$this</span><span class="o">-&gt;</span><span class="na">options</span><span class="p">[</span><span class="s1">&#39;automatic&#39;</span><span class="p">])</span> <span class="p">{</span> <span class="nv">$this</span><span class="o">-&gt;</span><span class="na">processAllFiles</span><span class="p">();</span> <span class="p">}</span></div><div class='line' id='LC185'>&nbsp;&nbsp;&nbsp;&nbsp;<span class="p">}</span></div><div class='line' id='LC186'>&nbsp;&nbsp;&nbsp;&nbsp;</div><div class='line' id='LC187'>&nbsp;&nbsp;<span class="p">}</span></div><div class='line' id='LC188'>&nbsp;&nbsp;</div><div class='line' id='LC189'>&nbsp;&nbsp;<span class="sd">/**</span></div><div class='line' id='LC190'><span class="sd">    * removeFile removes a specific file from the uploaded directory</span></div><div class='line' id='LC191'><span class="sd">    *</span></div><div class='line' id='LC192'><span class="sd">    * @param string $name A reference to the filename to delete from the uploadDirectory</span></div><div class='line' id='LC193'><span class="sd">    * @return boolean</span></div><div class='line' id='LC194'><span class="sd">    * @access public</span></div><div class='line' id='LC195'><span class="sd">    */</span></div><div class='line' id='LC196'>&nbsp;&nbsp;<span class="k">function</span> <span class="nf">removeFile</span><span class="p">(</span><span class="nv">$name</span> <span class="o">=</span> <span class="k">null</span><span class="p">){</span></div><div class='line' id='LC197'>&nbsp;&nbsp;&nbsp;&nbsp;<span class="k">if</span><span class="p">(</span><span class="o">!</span><span class="nv">$name</span> <span class="o">||</span> <span class="nb">strpos</span><span class="p">(</span><span class="nv">$name</span><span class="p">,</span> <span class="s1">&#39;://&#39;</span><span class="p">)){</span></div><div class='line' id='LC198'>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span class="k">return</span> <span class="k">false</span><span class="p">;</span></div><div class='line' id='LC199'>&nbsp;&nbsp;&nbsp;&nbsp;<span class="p">}</span></div><div class='line' id='LC200'>&nbsp;&nbsp;&nbsp;&nbsp;</div><div class='line' id='LC201'>&nbsp;&nbsp;&nbsp;&nbsp;<span class="nv">$up_dir</span> <span class="o">=</span> <span class="nv">$this</span><span class="o">-&gt;</span><span class="na">options</span><span class="p">[</span><span class="s1">&#39;forceWebroot&#39;</span><span class="p">]</span> <span class="o">?</span> <span class="nx">WWW_ROOT</span> <span class="o">.</span> <span class="nv">$this</span><span class="o">-&gt;</span><span class="na">options</span><span class="p">[</span><span class="s1">&#39;uploadDir&#39;</span><span class="p">]</span> <span class="o">:</span> <span class="nv">$this</span><span class="o">-&gt;</span><span class="na">options</span><span class="p">[</span><span class="s1">&#39;uploadDir&#39;</span><span class="p">];</span></div><div class='line' id='LC202'>&nbsp;&nbsp;&nbsp;&nbsp;<span class="nv">$target_path</span> <span class="o">=</span> <span class="nv">$up_dir</span> <span class="o">.</span> <span class="nx">DS</span> <span class="o">.</span> <span class="nv">$name</span><span class="p">;</span></div><div class='line' id='LC203'>&nbsp;&nbsp;&nbsp;&nbsp;</div><div class='line' id='LC204'>&nbsp;&nbsp;&nbsp;&nbsp;<span class="c1">//delete main image -- $name</span></div><div class='line' id='LC205'>&nbsp;&nbsp;&nbsp;&nbsp;<span class="k">if</span><span class="p">(</span><span class="o">@</span><span class="nb">unlink</span><span class="p">(</span><span class="nv">$target_path</span><span class="p">)){</span></div><div class='line' id='LC206'>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span class="k">return</span> <span class="k">true</span><span class="p">;</span></div><div class='line' id='LC207'>&nbsp;&nbsp;&nbsp;&nbsp;<span class="p">}</span> <span class="k">else</span> <span class="p">{</span></div><div class='line' id='LC208'>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span class="k">return</span> <span class="k">false</span><span class="p">;</span></div><div class='line' id='LC209'>&nbsp;&nbsp;&nbsp;&nbsp;<span class="p">}</span></div><div class='line' id='LC210'>&nbsp;&nbsp;<span class="p">}</span></div><div class='line' id='LC211'>&nbsp;&nbsp;</div><div class='line' id='LC212'>&nbsp;&nbsp;<span class="sd">/**</span></div><div class='line' id='LC213'><span class="sd">    * removeFileById removes a specific file from the uploaded directory when given an id.</span></div><div class='line' id='LC214'><span class="sd">    *</span></div><div class='line' id='LC215'><span class="sd">    * @param string | int $id A reference to the filename to delete from the uploadDirectory</span></div><div class='line' id='LC216'><span class="sd">    * @return boolean</span></div><div class='line' id='LC217'><span class="sd">    * @access public</span></div><div class='line' id='LC218'><span class="sd">    */</span></div><div class='line' id='LC219'>&nbsp;&nbsp;<span class="k">function</span> <span class="nf">removeFileById</span><span class="p">(</span><span class="nv">$id</span> <span class="o">=</span> <span class="k">null</span><span class="p">){</span></div><div class='line' id='LC220'>&nbsp;&nbsp;&nbsp;&nbsp;<span class="k">if</span><span class="p">(</span><span class="o">!</span><span class="nv">$id</span><span class="p">){</span></div><div class='line' id='LC221'>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span class="k">return</span> <span class="k">false</span><span class="p">;</span></div><div class='line' id='LC222'>&nbsp;&nbsp;&nbsp;&nbsp;<span class="p">}</span></div><div class='line' id='LC223'>&nbsp;&nbsp;&nbsp;&nbsp;</div><div class='line' id='LC224'>&nbsp;&nbsp;&nbsp;&nbsp;<span class="nv">$model</span> <span class="o">=&amp;</span> <span class="nv">$this</span><span class="o">-&gt;</span><span class="na">getModel</span><span class="p">();</span></div><div class='line' id='LC225'>&nbsp;&nbsp;&nbsp;&nbsp;<span class="k">if</span><span class="p">(</span><span class="o">!</span><span class="nv">$model</span><span class="p">){</span></div><div class='line' id='LC226'>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span class="nv">$this</span><span class="o">-&gt;</span><span class="na">_error</span><span class="p">(</span><span class="s1">&#39;FileUpload::removeFileById -- no model detected.&#39;</span><span class="p">);</span></div><div class='line' id='LC227'>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span class="k">return</span> <span class="k">false</span><span class="p">;</span></div><div class='line' id='LC228'>&nbsp;&nbsp;&nbsp;&nbsp;<span class="p">}</span></div><div class='line' id='LC229'>&nbsp;&nbsp;&nbsp;&nbsp;</div><div class='line' id='LC230'>&nbsp;&nbsp;&nbsp;&nbsp;<span class="nv">$upload</span> <span class="o">=</span> <span class="nv">$model</span><span class="o">-&gt;</span><span class="na">findById</span><span class="p">(</span><span class="nv">$id</span><span class="p">);</span></div><div class='line' id='LC231'>&nbsp;&nbsp;&nbsp;&nbsp;<span class="nv">$name</span> <span class="o">=</span> <span class="nv">$upload</span><span class="p">[</span><span class="nv">$this</span><span class="o">-&gt;</span><span class="na">options</span><span class="p">[</span><span class="s1">&#39;fileModel&#39;</span><span class="p">]][</span><span class="nv">$this</span><span class="o">-&gt;</span><span class="na">options</span><span class="p">[</span><span class="s1">&#39;fields&#39;</span><span class="p">][</span><span class="s1">&#39;name&#39;</span><span class="p">]];</span></div><div class='line' id='LC232'>&nbsp;&nbsp;&nbsp;&nbsp;<span class="k">return</span> <span class="nv">$this</span><span class="o">-&gt;</span><span class="na">removeFile</span><span class="p">(</span><span class="nv">$name</span><span class="p">);</span></div><div class='line' id='LC233'>&nbsp;&nbsp;<span class="p">}</span></div><div class='line' id='LC234'>&nbsp;&nbsp;</div><div class='line' id='LC235'>&nbsp;&nbsp;<span class="sd">/**</span></div><div class='line' id='LC236'><span class="sd">    * showErrors itterates through the errors array</span></div><div class='line' id='LC237'><span class="sd">    * and returns a concatinated string of errors sepearated by</span></div><div class='line' id='LC238'><span class="sd">    * the $sep</span></div><div class='line' id='LC239'><span class="sd">    *</span></div><div class='line' id='LC240'><span class="sd">    * @param string $sep A seperated defaults to &lt;br /&gt;</span></div><div class='line' id='LC241'><span class="sd">    * @return string</span></div><div class='line' id='LC242'><span class="sd">    * @access public</span></div><div class='line' id='LC243'><span class="sd">    */</span></div><div class='line' id='LC244'>&nbsp;&nbsp;<span class="k">function</span> <span class="nf">showErrors</span><span class="p">(</span><span class="nv">$sep</span> <span class="o">=</span> <span class="s2">&quot;&lt;br /&gt;&quot;</span><span class="p">){</span></div><div class='line' id='LC245'>&nbsp;&nbsp;&nbsp;&nbsp;<span class="nv">$retval</span> <span class="o">=</span> <span class="s2">&quot;&quot;</span><span class="p">;</span></div><div class='line' id='LC246'>&nbsp;&nbsp;&nbsp;&nbsp;<span class="k">foreach</span><span class="p">(</span><span class="nv">$this</span><span class="o">-&gt;</span><span class="na">errors</span> <span class="k">as</span> <span class="nv">$error</span><span class="p">){</span></div><div class='line' id='LC247'>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span class="nv">$retval</span> <span class="o">.=</span> <span class="s2">&quot;</span><span class="si">$error</span><span class="s2"> </span><span class="si">$sep</span><span class="s2">&quot;</span><span class="p">;</span></div><div class='line' id='LC248'>&nbsp;&nbsp;&nbsp;&nbsp;<span class="p">}</span></div><div class='line' id='LC249'>&nbsp;&nbsp;&nbsp;&nbsp;<span class="k">return</span> <span class="nv">$retval</span><span class="p">;</span></div><div class='line' id='LC250'>&nbsp;&nbsp;<span class="p">}</span></div><div class='line' id='LC251'>&nbsp;&nbsp;</div><div class='line' id='LC252'>&nbsp;&nbsp;</div><div class='line' id='LC253'>&nbsp;&nbsp;<span class="sd">/**</span></div><div class='line' id='LC254'><span class="sd">    * _processFile takes the detected uploaded file and saves it to the</span></div><div class='line' id='LC255'><span class="sd">    * uploadDir specified, it then sets success to true or false depending</span></div><div class='line' id='LC256'><span class="sd">    * on the save success of the model (if there is a model).  If there is no model</span></div><div class='line' id='LC257'><span class="sd">    * success is meassured on the success of the file being saved to the uploadDir</span></div><div class='line' id='LC258'><span class="sd">    *</span></div><div class='line' id='LC259'><span class="sd">    * finalFile is also set upon success of an uploaded file to the uploadDir</span></div><div class='line' id='LC260'><span class="sd">    *</span></div><div class='line' id='LC261'><span class="sd">    * @return void</span></div><div class='line' id='LC262'><span class="sd">    * @access public</span></div><div class='line' id='LC263'><span class="sd">    */</span></div><div class='line' id='LC264'>&nbsp;&nbsp;<span class="k">function</span> <span class="nf">processFile</span><span class="p">(){</span></div><div class='line' id='LC265'>&nbsp;&nbsp;&nbsp;&nbsp;<span class="c1">//Backporting for manual use processFile(), show error when using.</span></div><div class='line' id='LC266'>&nbsp;&nbsp;&nbsp;&nbsp;<span class="k">if</span><span class="p">(</span><span class="nb">count</span><span class="p">(</span><span class="nv">$this</span><span class="o">-&gt;</span><span class="na">uploadedFiles</span><span class="p">)</span> <span class="o">&amp;&amp;</span> <span class="k">empty</span><span class="p">(</span><span class="nv">$this</span><span class="o">-&gt;</span><span class="na">currentFile</span><span class="p">)){</span></div><div class='line' id='LC267'>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span class="nv">$this</span><span class="o">-&gt;</span><span class="na">_error</span><span class="p">(</span><span class="s1">&#39;FileUpload: You\&#39;re using a deprecated standard of uploading files manually.  Don\&#39;t call processFile() directly. Instead, call processAllFiles().&#39;</span><span class="p">);</span></div><div class='line' id='LC268'>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span class="nv">$this</span><span class="o">-&gt;</span><span class="na">setCurrentFile</span><span class="p">(</span><span class="nv">$this</span><span class="o">-&gt;</span><span class="na">uploadedFiles</span><span class="p">[</span><span class="m">0</span><span class="p">]);</span></div><div class='line' id='LC269'>&nbsp;&nbsp;&nbsp;&nbsp;<span class="p">}</span></div><div class='line' id='LC270'>&nbsp;&nbsp;&nbsp;&nbsp;</div><div class='line' id='LC271'>&nbsp;&nbsp;&nbsp;&nbsp;<span class="nv">$save_data</span> <span class="o">=</span> <span class="nv">$this</span><span class="o">-&gt;</span><span class="na">__prepareSaveData</span><span class="p">();</span></div><div class='line' id='LC272'>&nbsp;&nbsp;&nbsp;&nbsp;</div><div class='line' id='LC273'>&nbsp;&nbsp;&nbsp;&nbsp;<span class="nv">$this</span><span class="o">-&gt;</span><span class="na">Uploader</span><span class="o">-&gt;</span><span class="na">file</span> <span class="o">=</span> <span class="nv">$this</span><span class="o">-&gt;</span><span class="na">currentFile</span><span class="p">;</span></div><div class='line' id='LC274'>&nbsp;&nbsp;&nbsp;&nbsp;<span class="k">if</span><span class="p">(</span><span class="nv">$finalFile</span> <span class="o">=</span> <span class="nv">$this</span><span class="o">-&gt;</span><span class="na">Uploader</span><span class="o">-&gt;</span><span class="na">processFile</span><span class="p">()){</span></div><div class='line' id='LC275'>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span class="nv">$this</span><span class="o">-&gt;</span><span class="na">finalFiles</span><span class="p">[]</span> <span class="o">=</span> <span class="nv">$finalFile</span><span class="p">;</span></div><div class='line' id='LC276'>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span class="nv">$this</span><span class="o">-&gt;</span><span class="na">finalFile</span> <span class="o">=</span> <span class="nv">$finalFile</span><span class="p">;</span> <span class="c1">//backported.  //finalFile is now depreciated</span></div><div class='line' id='LC277'>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span class="nv">$save_data</span><span class="p">[</span><span class="nv">$this</span><span class="o">-&gt;</span><span class="na">options</span><span class="p">[</span><span class="s1">&#39;fileModel&#39;</span><span class="p">]][</span><span class="nv">$this</span><span class="o">-&gt;</span><span class="na">options</span><span class="p">[</span><span class="s1">&#39;fields&#39;</span><span class="p">][</span><span class="s1">&#39;name&#39;</span><span class="p">]]</span> <span class="o">=</span> <span class="nv">$this</span><span class="o">-&gt;</span><span class="na">finalFile</span><span class="p">;</span></div><div class='line' id='LC278'>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span class="nv">$save_data</span><span class="p">[</span><span class="nv">$this</span><span class="o">-&gt;</span><span class="na">options</span><span class="p">[</span><span class="s1">&#39;fileModel&#39;</span><span class="p">]][</span><span class="nv">$this</span><span class="o">-&gt;</span><span class="na">options</span><span class="p">[</span><span class="s1">&#39;fields&#39;</span><span class="p">][</span><span class="s1">&#39;type&#39;</span><span class="p">]]</span> <span class="o">=</span> <span class="nv">$this</span><span class="o">-&gt;</span><span class="na">currentFile</span><span class="p">[</span><span class="s1">&#39;type&#39;</span><span class="p">];</span></div><div class='line' id='LC279'>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span class="nv">$save_data</span><span class="p">[</span><span class="nv">$this</span><span class="o">-&gt;</span><span class="na">options</span><span class="p">[</span><span class="s1">&#39;fileModel&#39;</span><span class="p">]][</span><span class="nv">$this</span><span class="o">-&gt;</span><span class="na">options</span><span class="p">[</span><span class="s1">&#39;fields&#39;</span><span class="p">][</span><span class="s1">&#39;size&#39;</span><span class="p">]]</span> <span class="o">=</span> <span class="nv">$this</span><span class="o">-&gt;</span><span class="na">currentFile</span><span class="p">[</span><span class="s1">&#39;size&#39;</span><span class="p">];</span></div><div class='line' id='LC280'>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span class="nv">$model</span> <span class="o">=&amp;</span> <span class="nv">$this</span><span class="o">-&gt;</span><span class="na">getModel</span><span class="p">();</span></div><div class='line' id='LC281'>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</div><div class='line' id='LC282'>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span class="c1">//Save it</span></div><div class='line' id='LC283'>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span class="k">if</span><span class="p">(</span><span class="o">!</span><span class="nv">$model</span><span class="p">){</span></div><div class='line' id='LC284'>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span class="nv">$this</span><span class="o">-&gt;</span><span class="na">success</span> <span class="o">=</span> <span class="k">true</span><span class="p">;</span></div><div class='line' id='LC285'>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span class="p">}</span></div><div class='line' id='LC286'>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span class="k">else</span><span class="p">{</span></div><div class='line' id='LC287'>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span class="k">if</span><span class="p">(</span><span class="nv">$this</span><span class="o">-&gt;</span><span class="na">options</span><span class="p">[</span><span class="s1">&#39;massSave&#39;</span><span class="p">]){</span></div><div class='line' id='LC288'>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span class="k">if</span><span class="p">(</span><span class="nv">$model</span><span class="o">-&gt;</span><span class="na">saveAll</span><span class="p">(</span><span class="nv">$save_data</span><span class="p">)){</span></div><div class='line' id='LC289'>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span class="nv">$this</span><span class="o">-&gt;</span><span class="na">success</span> <span class="o">=</span> <span class="k">true</span><span class="p">;</span></div><div class='line' id='LC290'>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span class="nv">$this</span><span class="o">-&gt;</span><span class="na">uploadIds</span><span class="p">[]</span> <span class="o">=</span> <span class="nv">$model</span><span class="o">-&gt;</span><span class="na">id</span><span class="p">;</span></div><div class='line' id='LC291'>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span class="nv">$this</span><span class="o">-&gt;</span><span class="na">uploadId</span> <span class="o">=</span> <span class="nv">$model</span><span class="o">-&gt;</span><span class="na">id</span><span class="p">;</span> <span class="c1">//backported. //uploadId is now depreciated.</span></div><div class='line' id='LC292'>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span class="p">}</span></div><div class='line' id='LC293'>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span class="p">}</span></div><div class='line' id='LC294'>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span class="k">else</span><span class="p">{</span></div><div class='line' id='LC295'>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span class="k">if</span><span class="p">(</span><span class="nv">$model</span><span class="o">-&gt;</span><span class="na">save</span><span class="p">(</span><span class="nv">$save_data</span><span class="p">)){</span></div><div class='line' id='LC296'>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span class="nv">$this</span><span class="o">-&gt;</span><span class="na">success</span> <span class="o">=</span> <span class="k">true</span><span class="p">;</span></div><div class='line' id='LC297'>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span class="nv">$this</span><span class="o">-&gt;</span><span class="na">uploadIds</span><span class="p">[]</span> <span class="o">=</span> <span class="nv">$model</span><span class="o">-&gt;</span><span class="na">id</span><span class="p">;</span></div><div class='line' id='LC298'>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span class="nv">$this</span><span class="o">-&gt;</span><span class="na">uploadId</span> <span class="o">=</span> <span class="nv">$model</span><span class="o">-&gt;</span><span class="na">id</span><span class="p">;</span> <span class="c1">//backported. //uploadId is now depreciated.</span></div><div class='line' id='LC299'>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span class="p">}</span></div><div class='line' id='LC300'>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span class="p">}</span></div><div class='line' id='LC301'>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span class="nv">$model</span><span class="o">-&gt;</span><span class="na">create</span><span class="p">();</span> <span class="c1">//get ready for the next one.</span></div><div class='line' id='LC302'>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span class="p">}</span></div><div class='line' id='LC303'>&nbsp;&nbsp;&nbsp;&nbsp;<span class="p">}</span></div><div class='line' id='LC304'>&nbsp;&nbsp;&nbsp;&nbsp;<span class="k">else</span> <span class="p">{</span></div><div class='line' id='LC305'>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span class="c1">//add uploader errors to component errors list</span></div><div class='line' id='LC306'>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span class="k">foreach</span><span class="p">(</span><span class="nv">$this</span><span class="o">-&gt;</span><span class="na">Uploader</span><span class="o">-&gt;</span><span class="na">errors</span> <span class="k">as</span> <span class="nv">$error</span><span class="p">){</span></div><div class='line' id='LC307'>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span class="nv">$this</span><span class="o">-&gt;</span><span class="na">errors</span><span class="p">[]</span> <span class="o">=</span> <span class="nv">$error</span><span class="p">;</span></div><div class='line' id='LC308'>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span class="p">}</span></div><div class='line' id='LC309'>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span class="nv">$this</span><span class="o">-&gt;</span><span class="na">_error</span><span class="p">(</span><span class="s1">&#39;FileUpload::processFile() - Unable to save temp file to file system.&#39;</span><span class="p">);</span></div><div class='line' id='LC310'>&nbsp;&nbsp;&nbsp;&nbsp;<span class="p">}</span></div><div class='line' id='LC311'>&nbsp;&nbsp;<span class="p">}</span></div><div class='line' id='LC312'>&nbsp;&nbsp;</div><div class='line' id='LC313'>&nbsp;&nbsp;<span class="sd">/** __prepareSaveData is used to help generate the array structure depending</span></div><div class='line' id='LC314'><span class="sd">    * that relys on $this-&gt;options[&#39;massSave&#39;] to decide how to structure the save data for</span></div><div class='line' id='LC315'><span class="sd">    * the upload.</span></div><div class='line' id='LC316'><span class="sd">    *</span></div><div class='line' id='LC317'><span class="sd">    * @access private</span></div><div class='line' id='LC318'><span class="sd">    * @return array of prepared savedata.</span></div><div class='line' id='LC319'><span class="sd">    */</span></div><div class='line' id='LC320'>&nbsp;&nbsp;<span class="k">function</span> <span class="nf">__prepareSaveData</span><span class="p">(){</span></div><div class='line' id='LC321'>&nbsp;&nbsp;&nbsp;&nbsp;<span class="nv">$retval</span> <span class="o">=</span> <span class="k">array</span><span class="p">();</span></div><div class='line' id='LC322'>&nbsp;&nbsp;&nbsp;&nbsp;</div><div class='line' id='LC323'>&nbsp;&nbsp;&nbsp;&nbsp;<span class="k">if</span><span class="p">(</span><span class="nv">$this</span><span class="o">-&gt;</span><span class="na">options</span><span class="p">[</span><span class="s1">&#39;fileModel&#39;</span><span class="p">]){</span></div><div class='line' id='LC324'>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span class="nv">$retval</span> <span class="o">=</span> <span class="nv">$this</span><span class="o">-&gt;</span><span class="na">data</span><span class="p">;</span></div><div class='line' id='LC325'>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span class="k">for</span><span class="p">(</span><span class="nv">$i</span><span class="o">=</span><span class="m">0</span><span class="p">;</span><span class="nv">$i</span><span class="o">&lt;</span><span class="nb">count</span><span class="p">(</span><span class="nv">$this</span><span class="o">-&gt;</span><span class="na">uploadedFiles</span><span class="p">);</span><span class="nv">$i</span><span class="o">++</span><span class="p">){</span></div><div class='line' id='LC326'>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span class="nb">unset</span><span class="p">(</span><span class="nv">$retval</span><span class="p">[</span><span class="nv">$this</span><span class="o">-&gt;</span><span class="na">options</span><span class="p">[</span><span class="s1">&#39;fileModel&#39;</span><span class="p">]][</span><span class="nv">$i</span><span class="p">]);</span></div><div class='line' id='LC327'>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span class="p">}</span> </div><div class='line' id='LC328'>&nbsp;&nbsp;&nbsp;&nbsp;<span class="p">}</span></div><div class='line' id='LC329'>&nbsp;&nbsp;&nbsp;&nbsp;</div><div class='line' id='LC330'>&nbsp;&nbsp;&nbsp;&nbsp;<span class="k">return</span> <span class="nv">$retval</span><span class="p">;</span></div><div class='line' id='LC331'>&nbsp;&nbsp;<span class="p">}</span></div><div class='line' id='LC332'>&nbsp;&nbsp;</div><div class='line' id='LC333'>&nbsp;&nbsp;<span class="sd">/**</span></div><div class='line' id='LC334'><span class="sd">    * process all files that are queued up to be saved to the filesystem or database.</span></div><div class='line' id='LC335'><span class="sd">    * </span></div><div class='line' id='LC336'><span class="sd">    * @return void</span></div><div class='line' id='LC337'><span class="sd">    * @access public</span></div><div class='line' id='LC338'><span class="sd">    */</span></div><div class='line' id='LC339'>&nbsp;&nbsp;<span class="k">function</span> <span class="nf">processAllFiles</span><span class="p">(){</span></div><div class='line' id='LC340'>&nbsp;&nbsp;&nbsp;&nbsp;<span class="k">foreach</span><span class="p">(</span><span class="nv">$this</span><span class="o">-&gt;</span><span class="na">uploadedFiles</span> <span class="k">as</span> <span class="nv">$file</span><span class="p">){</span></div><div class='line' id='LC341'>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span class="nv">$this</span><span class="o">-&gt;</span><span class="na">_setCurrentFile</span><span class="p">(</span><span class="nv">$file</span><span class="p">);</span></div><div class='line' id='LC342'>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span class="nv">$this</span><span class="o">-&gt;</span><span class="na">Uploader</span><span class="o">-&gt;</span><span class="na">file</span> <span class="o">=</span> <span class="nv">$this</span><span class="o">-&gt;</span><span class="na">options</span><span class="p">[</span><span class="s1">&#39;fileModel&#39;</span><span class="p">]</span> <span class="o">?</span> <span class="nv">$file</span><span class="p">[</span><span class="nv">$this</span><span class="o">-&gt;</span><span class="na">options</span><span class="p">[</span><span class="s1">&#39;fileVar&#39;</span><span class="p">]]</span> <span class="o">:</span> <span class="nv">$file</span><span class="p">;</span></div><div class='line' id='LC343'>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span class="nv">$this</span><span class="o">-&gt;</span><span class="na">processFile</span><span class="p">();</span></div><div class='line' id='LC344'>&nbsp;&nbsp;&nbsp;&nbsp;<span class="p">}</span></div><div class='line' id='LC345'>&nbsp;&nbsp;<span class="p">}</span></div><div class='line' id='LC346'>&nbsp;&nbsp;</div><div class='line' id='LC347'>&nbsp;&nbsp;<span class="sd">/**</span></div><div class='line' id='LC348'><span class="sd">    * Set&#39;s the current file to process.</span></div><div class='line' id='LC349'><span class="sd">    *</span></div><div class='line' id='LC350'><span class="sd">    * @access private</span></div><div class='line' id='LC351'><span class="sd">    * @param associative array of file</span></div><div class='line' id='LC352'><span class="sd">    * @return void</span></div><div class='line' id='LC353'><span class="sd">    */</span></div><div class='line' id='LC354'>&nbsp;&nbsp;<span class="k">function</span> <span class="nf">_setCurrentFile</span><span class="p">(</span><span class="nv">$file</span><span class="p">){</span></div><div class='line' id='LC355'>&nbsp;&nbsp;&nbsp;&nbsp;<span class="k">if</span><span class="p">(</span><span class="nv">$this</span><span class="o">-&gt;</span><span class="na">options</span><span class="p">[</span><span class="s1">&#39;fileModel&#39;</span><span class="p">]){</span></div><div class='line' id='LC356'>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span class="nv">$this</span><span class="o">-&gt;</span><span class="na">currentFile</span> <span class="o">=</span> <span class="nv">$file</span><span class="p">[</span><span class="nv">$this</span><span class="o">-&gt;</span><span class="na">options</span><span class="p">[</span><span class="s1">&#39;fileVar&#39;</span><span class="p">]];</span></div><div class='line' id='LC357'>&nbsp;&nbsp;&nbsp;&nbsp;<span class="p">}</span></div><div class='line' id='LC358'>&nbsp;&nbsp;&nbsp;&nbsp;<span class="k">else</span> <span class="p">{</span></div><div class='line' id='LC359'>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span class="nv">$this</span><span class="o">-&gt;</span><span class="na">currentFile</span> <span class="o">=</span> <span class="nv">$file</span><span class="p">;</span></div><div class='line' id='LC360'>&nbsp;&nbsp;&nbsp;&nbsp;<span class="p">}</span></div><div class='line' id='LC361'>&nbsp;&nbsp;<span class="p">}</span></div><div class='line' id='LC362'>&nbsp;&nbsp;</div><div class='line' id='LC363'>&nbsp;&nbsp;<span class="sd">/**</span></div><div class='line' id='LC364'><span class="sd">    * Returns a reference to the model object specified, and attempts</span></div><div class='line' id='LC365'><span class="sd">    * to load it if it is not found.</span></div><div class='line' id='LC366'><span class="sd">    *</span></div><div class='line' id='LC367'><span class="sd">    * @param string $name Model name (defaults to FileUpload::$fileModel)</span></div><div class='line' id='LC368'><span class="sd">    * @return object A reference to a model object</span></div><div class='line' id='LC369'><span class="sd">    * @access public</span></div><div class='line' id='LC370'><span class="sd">    */</span></div><div class='line' id='LC371'>	<span class="k">function</span> <span class="o">&amp;</span><span class="nf">getModel</span><span class="p">(</span><span class="nv">$name</span> <span class="o">=</span> <span class="k">null</span><span class="p">)</span> <span class="p">{</span></div><div class='line' id='LC372'>		<span class="nv">$model</span> <span class="o">=</span> <span class="k">null</span><span class="p">;</span></div><div class='line' id='LC373'>		<span class="k">if</span> <span class="p">(</span><span class="o">!</span><span class="nv">$name</span><span class="p">)</span> <span class="p">{</span></div><div class='line' id='LC374'>			<span class="nv">$name</span> <span class="o">=</span> <span class="nv">$this</span><span class="o">-&gt;</span><span class="na">options</span><span class="p">[</span><span class="s1">&#39;fileModel&#39;</span><span class="p">];</span></div><div class='line' id='LC375'>		<span class="p">}</span></div><div class='line' id='LC376'>&nbsp;&nbsp;&nbsp;&nbsp;</div><div class='line' id='LC377'>&nbsp;&nbsp;&nbsp;&nbsp;<span class="k">if</span><span class="p">(</span><span class="nv">$name</span><span class="p">){</span></div><div class='line' id='LC378'>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span class="k">if</span> <span class="p">(</span><span class="nx">PHP5</span><span class="p">)</span> <span class="p">{</span></div><div class='line' id='LC379'>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span class="nv">$model</span> <span class="o">=</span> <span class="nx">ClassRegistry</span><span class="o">::</span><span class="na">init</span><span class="p">(</span><span class="nv">$name</span><span class="p">);</span></div><div class='line' id='LC380'>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span class="p">}</span> <span class="k">else</span> <span class="p">{</span></div><div class='line' id='LC381'>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span class="nv">$model</span> <span class="o">=&amp;</span> <span class="nx">ClassRegistry</span><span class="o">::</span><span class="na">init</span><span class="p">(</span><span class="nv">$name</span><span class="p">);</span></div><div class='line' id='LC382'>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span class="p">}</span></div><div class='line' id='LC383'><br/></div><div class='line' id='LC384'>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span class="k">if</span> <span class="p">(</span><span class="k">empty</span><span class="p">(</span><span class="nv">$model</span><span class="p">)</span> <span class="o">&amp;&amp;</span> <span class="nv">$this</span><span class="o">-&gt;</span><span class="na">options</span><span class="p">[</span><span class="s1">&#39;fileModel&#39;</span><span class="p">])</span> <span class="p">{</span></div><div class='line' id='LC385'>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span class="nv">$this</span><span class="o">-&gt;</span><span class="na">_error</span><span class="p">(</span><span class="s1">&#39;FileUpload::getModel() - Model is not set or could not be found&#39;</span><span class="p">);</span></div><div class='line' id='LC386'>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span class="k">return</span> <span class="k">null</span><span class="p">;</span></div><div class='line' id='LC387'>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span class="p">}</span></div><div class='line' id='LC388'>&nbsp;&nbsp;&nbsp;&nbsp;<span class="p">}</span></div><div class='line' id='LC389'>		<span class="k">return</span> <span class="nv">$model</span><span class="p">;</span></div><div class='line' id='LC390'>	<span class="p">}</span></div><div class='line' id='LC391'>&nbsp;&nbsp;</div><div class='line' id='LC392'>&nbsp;&nbsp;<span class="sd">/**</span></div><div class='line' id='LC393'><span class="sd">    * Adds error messages to the component</span></div><div class='line' id='LC394'><span class="sd">    *</span></div><div class='line' id='LC395'><span class="sd">    * @param string $text String of error message to save</span></div><div class='line' id='LC396'><span class="sd">    * @return void</span></div><div class='line' id='LC397'><span class="sd">    * @access protected</span></div><div class='line' id='LC398'><span class="sd">    */</span></div><div class='line' id='LC399'>&nbsp;&nbsp;<span class="k">function</span> <span class="nf">_error</span><span class="p">(</span><span class="nv">$text</span><span class="p">){</span></div><div class='line' id='LC400'>&nbsp;&nbsp;&nbsp;&nbsp;<span class="nv">$message</span> <span class="o">=</span> <span class="nx">__</span><span class="p">(</span><span class="nv">$text</span><span class="p">,</span><span class="k">true</span><span class="p">);</span></div><div class='line' id='LC401'>&nbsp;&nbsp;&nbsp;&nbsp;<span class="nv">$this</span><span class="o">-&gt;</span><span class="na">errors</span><span class="p">[]</span> <span class="o">=</span> <span class="nv">$message</span><span class="p">;</span></div><div class='line' id='LC402'>&nbsp;&nbsp;&nbsp;&nbsp;<span class="nb">trigger_error</span><span class="p">(</span><span class="nv">$message</span><span class="p">,</span><span class="nx">E_USER_WARNING</span><span class="p">);</span></div><div class='line' id='LC403'>&nbsp;&nbsp;<span class="p">}</span></div><div class='line' id='LC404'>&nbsp;&nbsp;</div><div class='line' id='LC405'>&nbsp;&nbsp;<span class="sd">/**</span></div><div class='line' id='LC406'><span class="sd">    * Returns an array of the uploaded file or false if there is not a file</span></div><div class='line' id='LC407'><span class="sd">    *</span></div><div class='line' id='LC408'><span class="sd">    * @return array|boolean Array of uploaded file, or false if no file uploaded</span></div><div class='line' id='LC409'><span class="sd">    * @access protected</span></div><div class='line' id='LC410'><span class="sd">    */</span></div><div class='line' id='LC411'>&nbsp;&nbsp;<span class="k">function</span> <span class="nf">_uploadedFilesArray</span><span class="p">(){</span></div><div class='line' id='LC412'>&nbsp;&nbsp;&nbsp;&nbsp;<span class="nv">$retval</span> <span class="o">=</span> <span class="k">array</span><span class="p">();</span></div><div class='line' id='LC413'>&nbsp;&nbsp;&nbsp;&nbsp;<span class="k">if</span><span class="p">(</span><span class="nv">$this</span><span class="o">-&gt;</span><span class="na">options</span><span class="p">[</span><span class="s1">&#39;fileModel&#39;</span><span class="p">]){</span> <span class="c1">//Model</span></div><div class='line' id='LC414'>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span class="k">if</span><span class="p">(</span><span class="nb">isset</span><span class="p">(</span><span class="nv">$this</span><span class="o">-&gt;</span><span class="na">data</span><span class="p">[</span><span class="nv">$this</span><span class="o">-&gt;</span><span class="na">options</span><span class="p">[</span><span class="s1">&#39;fileModel&#39;</span><span class="p">]][</span><span class="nv">$this</span><span class="o">-&gt;</span><span class="na">options</span><span class="p">[</span><span class="s1">&#39;fileVar&#39;</span><span class="p">]]))</span> <span class="p">{</span></div><div class='line' id='LC415'>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span class="nv">$retval</span><span class="p">[][</span><span class="nv">$this</span><span class="o">-&gt;</span><span class="na">options</span><span class="p">[</span><span class="s1">&#39;fileVar&#39;</span><span class="p">]]</span> <span class="o">=</span> <span class="nv">$this</span><span class="o">-&gt;</span><span class="na">data</span><span class="p">[</span><span class="nv">$this</span><span class="o">-&gt;</span><span class="na">options</span><span class="p">[</span><span class="s1">&#39;fileModel&#39;</span><span class="p">]][</span><span class="nv">$this</span><span class="o">-&gt;</span><span class="na">options</span><span class="p">[</span><span class="s1">&#39;fileVar&#39;</span><span class="p">]];</span></div><div class='line' id='LC416'>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span class="p">}</span></div><div class='line' id='LC417'>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span class="k">elseif</span><span class="p">(</span><span class="nb">isset</span><span class="p">(</span><span class="nv">$this</span><span class="o">-&gt;</span><span class="na">data</span><span class="p">[</span><span class="nv">$this</span><span class="o">-&gt;</span><span class="na">options</span><span class="p">[</span><span class="s1">&#39;fileModel&#39;</span><span class="p">]][</span><span class="m">0</span><span class="p">][</span><span class="nv">$this</span><span class="o">-&gt;</span><span class="na">options</span><span class="p">[</span><span class="s1">&#39;fileVar&#39;</span><span class="p">]])){</span></div><div class='line' id='LC418'>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span class="nv">$retval</span> <span class="o">=</span> <span class="nv">$this</span><span class="o">-&gt;</span><span class="na">data</span><span class="p">[</span><span class="nv">$this</span><span class="o">-&gt;</span><span class="na">options</span><span class="p">[</span><span class="s1">&#39;fileModel&#39;</span><span class="p">]];</span></div><div class='line' id='LC419'>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span class="p">}</span></div><div class='line' id='LC420'>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span class="k">else</span> <span class="p">{</span></div><div class='line' id='LC421'>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span class="nv">$retval</span> <span class="o">=</span> <span class="k">false</span><span class="p">;</span></div><div class='line' id='LC422'>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span class="p">}</span></div><div class='line' id='LC423'>&nbsp;&nbsp;&nbsp;&nbsp;<span class="p">}</span></div><div class='line' id='LC424'>&nbsp;&nbsp;&nbsp;&nbsp;<span class="k">else</span> <span class="p">{</span> <span class="c1">// No model</span></div><div class='line' id='LC425'>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span class="k">if</span><span class="p">(</span><span class="nb">isset</span><span class="p">(</span><span class="nv">$this</span><span class="o">-&gt;</span><span class="na">params</span><span class="p">[</span><span class="s1">&#39;form&#39;</span><span class="p">][</span><span class="nv">$this</span><span class="o">-&gt;</span><span class="na">options</span><span class="p">[</span><span class="s1">&#39;fileVar&#39;</span><span class="p">]])){</span></div><div class='line' id='LC426'>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span class="nv">$retval</span><span class="p">[][</span><span class="nv">$this</span><span class="o">-&gt;</span><span class="na">options</span><span class="p">[</span><span class="s1">&#39;fileVar&#39;</span><span class="p">]]</span> <span class="o">=</span> <span class="nv">$this</span><span class="o">-&gt;</span><span class="na">params</span><span class="p">[</span><span class="s1">&#39;form&#39;</span><span class="p">][</span><span class="nv">$this</span><span class="o">-&gt;</span><span class="na">options</span><span class="p">[</span><span class="s1">&#39;fileVar&#39;</span><span class="p">]];</span></div><div class='line' id='LC427'>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span class="p">}</span></div><div class='line' id='LC428'>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span class="k">elseif</span><span class="p">(</span><span class="nb">isset</span><span class="p">(</span><span class="nv">$this</span><span class="o">-&gt;</span><span class="na">data</span><span class="p">[</span><span class="nv">$this</span><span class="o">-&gt;</span><span class="na">options</span><span class="p">[</span><span class="s1">&#39;fileVar&#39;</span><span class="p">]][</span><span class="m">0</span><span class="p">])){</span> <span class="c1">//syntax for multiple files without a model is data[file][0]..data[file][1]..data[file][n]</span></div><div class='line' id='LC429'>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span class="nv">$retval</span> <span class="o">=</span> <span class="nv">$this</span><span class="o">-&gt;</span><span class="na">data</span><span class="p">[</span><span class="nv">$this</span><span class="o">-&gt;</span><span class="na">options</span><span class="p">[</span><span class="s1">&#39;fileVar&#39;</span><span class="p">]];</span></div><div class='line' id='LC430'>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span class="p">}</span></div><div class='line' id='LC431'>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span class="k">elseif</span><span class="p">(</span><span class="nb">isset</span><span class="p">(</span><span class="nv">$this</span><span class="o">-&gt;</span><span class="na">params</span><span class="p">[</span><span class="s1">&#39;form&#39;</span><span class="p">][</span><span class="nv">$this</span><span class="o">-&gt;</span><span class="na">options</span><span class="p">[</span><span class="s1">&#39;fileVar&#39;</span><span class="p">]][</span><span class="m">0</span><span class="p">]))</span> <span class="p">{</span></div><div class='line' id='LC432'>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span class="nv">$this</span><span class="o">-&gt;</span><span class="na">_error</span><span class="p">(</span><span class="s2">&quot;FileUpload: Multiple Files were detected without a model present, with the improper syntax. Use this naming scheme for your inputs: data[file][0]..data[file][1]..data[file][n]&quot;</span><span class="p">);</span></div><div class='line' id='LC433'>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span class="nv">$retval</span> <span class="o">=</span> <span class="k">false</span><span class="p">;</span></div><div class='line' id='LC434'>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span class="p">}</span></div><div class='line' id='LC435'>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span class="k">else</span> <span class="p">{</span></div><div class='line' id='LC436'>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span class="nv">$retval</span> <span class="o">=</span> <span class="k">false</span><span class="p">;</span></div><div class='line' id='LC437'>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span class="p">}</span></div><div class='line' id='LC438'>&nbsp;&nbsp;&nbsp;&nbsp;<span class="p">}</span></div><div class='line' id='LC439'>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</div><div class='line' id='LC440'>&nbsp;&nbsp;&nbsp;&nbsp;<span class="c1">//cleanup array. unset any file in the array that wasn&#39;t actually uploaded.</span></div><div class='line' id='LC441'>&nbsp;&nbsp;&nbsp;&nbsp;<span class="k">if</span><span class="p">(</span><span class="nv">$retval</span><span class="p">){</span></div><div class='line' id='LC442'>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span class="k">foreach</span><span class="p">(</span><span class="nv">$retval</span> <span class="k">as</span> <span class="nv">$key</span> <span class="o">=&gt;</span> <span class="nv">$file</span><span class="p">){</span></div><div class='line' id='LC443'>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span class="k">if</span><span class="p">(</span><span class="nb">is_array</span><span class="p">(</span><span class="nv">$file</span><span class="p">)</span> <span class="o">&amp;&amp;</span> <span class="nb">isset</span><span class="p">(</span><span class="nv">$file</span><span class="p">[</span><span class="nv">$this</span><span class="o">-&gt;</span><span class="na">options</span><span class="p">[</span><span class="s1">&#39;fileVar&#39;</span><span class="p">]])){</span></div><div class='line' id='LC444'>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span class="k">if</span><span class="p">(</span><span class="o">!</span><span class="k">empty</span><span class="p">(</span><span class="nv">$file</span><span class="p">[</span><span class="nv">$this</span><span class="o">-&gt;</span><span class="na">options</span><span class="p">[</span><span class="s1">&#39;fileVar&#39;</span><span class="p">]])</span> <span class="o">&amp;&amp;</span> <span class="o">!</span><span class="nb">isset</span><span class="p">(</span><span class="nv">$file</span><span class="p">[</span><span class="nv">$this</span><span class="o">-&gt;</span><span class="na">options</span><span class="p">[</span><span class="s1">&#39;fileVar&#39;</span><span class="p">]][</span><span class="s1">&#39;error&#39;</span><span class="p">])){</span></div><div class='line' id='LC445'>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span class="nv">$this</span><span class="o">-&gt;</span><span class="na">_error</span><span class="p">(</span><span class="s2">&quot;FileUpload::_uploadedFilesArray() error.  Only a filename was detected, not the actual file.  Make sure you have enctype=&#39;multipart/form-data&#39; in your form.  Please review documentation.&quot;</span><span class="p">);</span></div><div class='line' id='LC446'>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span class="p">}</span></div><div class='line' id='LC447'>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span class="k">if</span><span class="p">(</span><span class="nb">isset</span><span class="p">(</span><span class="nv">$file</span><span class="p">[</span><span class="nv">$this</span><span class="o">-&gt;</span><span class="na">options</span><span class="p">[</span><span class="s1">&#39;fileVar&#39;</span><span class="p">]][</span><span class="s1">&#39;error&#39;</span><span class="p">])</span> <span class="o">&amp;&amp;</span> <span class="nv">$file</span><span class="p">[</span><span class="nv">$this</span><span class="o">-&gt;</span><span class="na">options</span><span class="p">[</span><span class="s1">&#39;fileVar&#39;</span><span class="p">]][</span><span class="s1">&#39;error&#39;</span><span class="p">]</span> <span class="o">==</span> <span class="nx">UPLOAD_ERR_NO_FILE</span><span class="p">){</span></div><div class='line' id='LC448'>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span class="nb">unset</span><span class="p">(</span><span class="nv">$retval</span><span class="p">[</span><span class="nv">$key</span><span class="p">]);</span></div><div class='line' id='LC449'>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span class="p">}</span></div><div class='line' id='LC450'>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span class="p">}</span></div><div class='line' id='LC451'>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span class="k">elseif</span><span class="p">(</span><span class="nv">$this</span><span class="o">-&gt;</span><span class="na">options</span><span class="p">[</span><span class="s1">&#39;fileModel&#39;</span><span class="p">])</span> <span class="p">{</span></div><div class='line' id='LC452'>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span class="nb">unset</span><span class="p">(</span><span class="nv">$retval</span><span class="p">[</span><span class="nv">$key</span><span class="p">]);</span></div><div class='line' id='LC453'>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span class="p">}</span></div><div class='line' id='LC454'>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span class="p">}</span></div><div class='line' id='LC455'>&nbsp;&nbsp;&nbsp;&nbsp;<span class="p">}</span></div><div class='line' id='LC456'>&nbsp;&nbsp;&nbsp;&nbsp;</div><div class='line' id='LC457'>&nbsp;&nbsp;&nbsp;&nbsp;<span class="c1">//spit out an error if a file was detected but nothing is being returned by this method.</span></div><div class='line' id='LC458'>&nbsp;&nbsp;&nbsp;&nbsp;<span class="k">if</span><span class="p">(</span><span class="nv">$this</span><span class="o">-&gt;</span><span class="na">uploadDetected</span> <span class="o">&amp;&amp;</span> <span class="nv">$retval</span> <span class="o">===</span> <span class="k">false</span><span class="p">){</span></div><div class='line' id='LC459'>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span class="nv">$this</span><span class="o">-&gt;</span><span class="na">_error</span><span class="p">(</span><span class="s2">&quot;FileUpload: A file was detected, but was unable to be processed due to a misconfiguration of FileUpload. Current config -- fileModel:&#39;</span><span class="si">{</span><span class="nv">$this</span><span class="o">-&gt;</span><span class="na">options</span><span class="p">[</span><span class="s1">&#39;fileModel&#39;</span><span class="p">]</span><span class="si">}</span><span class="s2">&#39; fileVar:&#39;</span><span class="si">{</span><span class="nv">$this</span><span class="o">-&gt;</span><span class="na">options</span><span class="p">[</span><span class="s1">&#39;fileVar&#39;</span><span class="p">]</span><span class="si">}</span><span class="s2">&#39;&quot;</span><span class="p">);</span></div><div class='line' id='LC460'>&nbsp;&nbsp;&nbsp;&nbsp;<span class="p">}</span></div><div class='line' id='LC461'>&nbsp;&nbsp;&nbsp;&nbsp;</div><div class='line' id='LC462'>&nbsp;&nbsp;&nbsp;&nbsp;<span class="k">return</span> <span class="nv">$retval</span><span class="p">;</span></div><div class='line' id='LC463'>&nbsp;&nbsp;<span class="p">}</span></div><div class='line' id='LC464'>&nbsp;&nbsp;</div><div class='line' id='LC465'>&nbsp;&nbsp;<span class="sd">/**</span></div><div class='line' id='LC466'><span class="sd">    * Searches through the $haystack for a $key.</span></div><div class='line' id='LC467'><span class="sd">    *</span></div><div class='line' id='LC468'><span class="sd">    * @param string $needle String of key to search for in $haystack</span></div><div class='line' id='LC469'><span class="sd">    * @param array $haystack Array of which to search for $needle</span></div><div class='line' id='LC470'><span class="sd">    * @return boolean true if given key is in an array</span></div><div class='line' id='LC471'><span class="sd">    * @access protected</span></div><div class='line' id='LC472'><span class="sd">    */</span></div><div class='line' id='LC473'>&nbsp;&nbsp;<span class="k">function</span> <span class="nf">_multiArrayKeyExists</span><span class="p">(</span><span class="nv">$needle</span><span class="p">,</span> <span class="nv">$haystack</span><span class="p">)</span> <span class="p">{</span></div><div class='line' id='LC474'>&nbsp;&nbsp;&nbsp;&nbsp;<span class="k">if</span><span class="p">(</span><span class="nb">is_array</span><span class="p">(</span><span class="nv">$haystack</span><span class="p">)){</span></div><div class='line' id='LC475'>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span class="k">foreach</span> <span class="p">(</span><span class="nv">$haystack</span> <span class="k">as</span> <span class="nv">$key</span><span class="o">=&gt;</span><span class="nv">$value</span><span class="p">)</span> <span class="p">{</span></div><div class='line' id='LC476'>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span class="k">if</span> <span class="p">(</span><span class="nv">$needle</span><span class="o">===</span><span class="nv">$key</span> <span class="o">&amp;&amp;</span> <span class="nv">$value</span><span class="p">)</span> <span class="p">{</span></div><div class='line' id='LC477'>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span class="k">return</span> <span class="k">true</span><span class="p">;</span></div><div class='line' id='LC478'>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span class="p">}</span></div><div class='line' id='LC479'>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span class="k">if</span> <span class="p">(</span><span class="nb">is_array</span><span class="p">(</span><span class="nv">$value</span><span class="p">))</span> <span class="p">{</span></div><div class='line' id='LC480'>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span class="k">if</span><span class="p">(</span><span class="nv">$this</span><span class="o">-&gt;</span><span class="na">_multiArrayKeyExists</span><span class="p">(</span><span class="nv">$needle</span><span class="p">,</span> <span class="nv">$value</span><span class="p">)){</span></div><div class='line' id='LC481'>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span class="k">return</span> <span class="k">true</span><span class="p">;</span></div><div class='line' id='LC482'>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span class="p">}</span></div><div class='line' id='LC483'>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span class="p">}</span></div><div class='line' id='LC484'>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span class="p">}</span></div><div class='line' id='LC485'>&nbsp;&nbsp;&nbsp;&nbsp;<span class="p">}</span></div><div class='line' id='LC486'>&nbsp;&nbsp;&nbsp;&nbsp;<span class="k">return</span> <span class="k">false</span><span class="p">;</span></div><div class='line' id='LC487'>&nbsp;&nbsp;<span class="p">}</span></div><div class='line' id='LC488'><span class="p">}</span></div><div class='line' id='LC489'><br/></div><div class='line' id='LC490'><span class="cp">?&gt;</span><span class="x"></span></div></pre></div>
              
            
          </td>
        </tr>
      </table>
    
  </div>


          </div>
        </div>
      </div>
    </div>
  

  </div>


<div class="frame frame-loading" style="display:none;">
  <img src="/images/modules/ajax/big_spinner_336699.gif">
</div>

    </div>
  
      
    </div>

    <div id="footer" class="clearfix">
      <div class="site">
        <div class="sponsor">
          <a href="http://www.rackspace.com" class="logo">
            <img alt="Dedicated Server" src="https://assets1.github.com/images/modules/footer/rackspace_logo.png?v2?42a88d59f4e6454178639ad0cc38846a091c9551" />
          </a>
          Powered by the <a href="http://www.rackspace.com ">Dedicated
          Servers</a> and<br/> <a href="http://www.rackspacecloud.com">Cloud
          Computing</a> of Rackspace Hosting<span>&reg;</span>
        </div>

        <ul class="links">
          <li class="blog"><a href="https://github.com/blog">Blog</a></li>
          <li><a href="http://support.github.com">Support</a></li>
          <li><a href="https://github.com/training">Training</a></li>
          <li><a href="http://jobs.github.com">Job Board</a></li>
          <li><a href="http://shop.github.com">Shop</a></li>
          <li><a href="https://github.com/contact">Contact</a></li>
          <li><a href="http://develop.github.com">API</a></li>
          <li><a href="http://status.github.com">Status</a></li>
        </ul>
        <ul class="sosueme">
          <li class="main">&copy; 2011 <span id="_rrt" title="0.08750s from fe1.rs.github.com">GitHub</span> Inc. All rights reserved.</li>
          <li><a href="/site/terms">Terms of Service</a></li>
          <li><a href="/site/privacy">Privacy</a></li>
          <li><a href="https://github.com/security">Security</a></li>
        </ul>
      </div>
    </div><!-- /#footer -->

    
      
      
        <!-- current locale:  -->
        <div class="locales">
          <div class="site">

            <ul class="choices clearfix limited-locales">
              <li><span class="current">English</span></li>
              
                  <li><a rel="nofollow" href="?locale=de">Deutsch</a></li>
              
                  <li><a rel="nofollow" href="?locale=fr">Français</a></li>
              
                  <li><a rel="nofollow" href="?locale=ja">日本語</a></li>
              
                  <li><a rel="nofollow" href="?locale=pt-BR">Português (BR)</a></li>
              
                  <li><a rel="nofollow" href="?locale=ru">Русский</a></li>
              
                  <li><a rel="nofollow" href="?locale=zh">中文</a></li>
              
              <li class="all"><a href="#" class="minibutton btn-forward js-all-locales"><span><span class="icon"></span>See all available languages</span></a></li>
            </ul>

            <div class="all-locales clearfix">
              <h3>Your current locale selection: <strong>English</strong>. Choose another?</h3>
              
              
                <ul class="choices">
                  
                      <li><a rel="nofollow" href="?locale=en">English</a></li>
                  
                      <li><a rel="nofollow" href="?locale=af">Afrikaans</a></li>
                  
                      <li><a rel="nofollow" href="?locale=ca">Català</a></li>
                  
                      <li><a rel="nofollow" href="?locale=cs">Čeština</a></li>
                  
                      <li><a rel="nofollow" href="?locale=de">Deutsch</a></li>
                  
                </ul>
              
                <ul class="choices">
                  
                      <li><a rel="nofollow" href="?locale=es">Español</a></li>
                  
                      <li><a rel="nofollow" href="?locale=fr">Français</a></li>
                  
                      <li><a rel="nofollow" href="?locale=hr">Hrvatski</a></li>
                  
                      <li><a rel="nofollow" href="?locale=hu">Magyar</a></li>
                  
                      <li><a rel="nofollow" href="?locale=id">Indonesia</a></li>
                  
                </ul>
              
                <ul class="choices">
                  
                      <li><a rel="nofollow" href="?locale=it">Italiano</a></li>
                  
                      <li><a rel="nofollow" href="?locale=ja">日本語</a></li>
                  
                      <li><a rel="nofollow" href="?locale=nl">Nederlands</a></li>
                  
                      <li><a rel="nofollow" href="?locale=no">Norsk</a></li>
                  
                      <li><a rel="nofollow" href="?locale=pl">Polski</a></li>
                  
                </ul>
              
                <ul class="choices">
                  
                      <li><a rel="nofollow" href="?locale=pt-BR">Português (BR)</a></li>
                  
                      <li><a rel="nofollow" href="?locale=ru">Русский</a></li>
                  
                      <li><a rel="nofollow" href="?locale=sr">Српски</a></li>
                  
                      <li><a rel="nofollow" href="?locale=sv">Svenska</a></li>
                  
                      <li><a rel="nofollow" href="?locale=zh">中文</a></li>
                  
                </ul>
              
            </div>

          </div>
          <div class="fade"></div>
        </div>
      
    

    <script>window._auth_token = "adac8e2838ad68f406703237ee35dfac5ba1d47e"</script>
    

<div id="keyboard_shortcuts_pane" style="display:none">
  <h2>Keyboard Shortcuts <small><a href="#" class="js-see-all-keyboard-shortcuts">(see all)</a></small></h2>

  <div class="columns threecols">
    <div class="column first">
      <h3>Site wide shortcuts</h3>
      <dl class="keyboard-mappings">
        <dt>s</dt>
        <dd>Focus site search</dd>
      </dl>
      <dl class="keyboard-mappings">
        <dt>?</dt>
        <dd>Bring up this help dialog</dd>
      </dl>
    </div><!-- /.column.first -->

    <div class="column middle" style='display:none'>
      <h3>Commit list</h3>
      <dl class="keyboard-mappings">
        <dt>j</dt>
        <dd>Move selected down</dd>
      </dl>
      <dl class="keyboard-mappings">
        <dt>k</dt>
        <dd>Move selected up</dd>
      </dl>
      <dl class="keyboard-mappings">
        <dt>t</dt>
        <dd>Open tree</dd>
      </dl>
      <dl class="keyboard-mappings">
        <dt>p</dt>
        <dd>Open parent</dd>
      </dl>
      <dl class="keyboard-mappings">
        <dt>c <em>or</em> o <em>or</em> enter</dt>
        <dd>Open commit</dd>
      </dl>
    </div><!-- /.column.first -->

    <div class="column last" style='display:none'>
      <h3>Pull request list</h3>
      <dl class="keyboard-mappings">
        <dt>j</dt>
        <dd>Move selected down</dd>
      </dl>
      <dl class="keyboard-mappings">
        <dt>k</dt>
        <dd>Move selected up</dd>
      </dl>
      <dl class="keyboard-mappings">
        <dt>o <em>or</em> enter</dt>
        <dd>Open issue</dd>
      </dl>
    </div><!-- /.columns.last -->

  </div><!-- /.columns.equacols -->

  <div style='display:none'>
    <div class="rule"></div>

    <h3>Issues</h3>

    <div class="columns threecols">
      <div class="column first">
        <dl class="keyboard-mappings">
          <dt>j</dt>
          <dd>Move selected down</dd>
        </dl>
        <dl class="keyboard-mappings">
          <dt>k</dt>
          <dd>Move selected up</dd>
        </dl>
        <dl class="keyboard-mappings">
          <dt>x</dt>
          <dd>Toggle select target</dd>
        </dl>
        <dl class="keyboard-mappings">
          <dt>o <em>or</em> enter</dt>
          <dd>Open issue</dd>
        </dl>
      </div><!-- /.column.first -->
      <div class="column middle">
        <dl class="keyboard-mappings">
          <dt>I</dt>
          <dd>Mark selected as read</dd>
        </dl>
        <dl class="keyboard-mappings">
          <dt>U</dt>
          <dd>Mark selected as unread</dd>
        </dl>
        <dl class="keyboard-mappings">
          <dt>e</dt>
          <dd>Close selected</dd>
        </dl>
        <dl class="keyboard-mappings">
          <dt>y</dt>
          <dd>Remove selected from view</dd>
        </dl>
      </div><!-- /.column.middle -->
      <div class="column last">
        <dl class="keyboard-mappings">
          <dt>c</dt>
          <dd>Create issue</dd>
        </dl>
        <dl class="keyboard-mappings">
          <dt>l</dt>
          <dd>Create label</dd>
        </dl>
        <dl class="keyboard-mappings">
          <dt>i</dt>
          <dd>Back to inbox</dd>
        </dl>
        <dl class="keyboard-mappings">
          <dt>u</dt>
          <dd>Back to issues</dd>
        </dl>
        <dl class="keyboard-mappings">
          <dt>/</dt>
          <dd>Focus issues search</dd>
        </dl>
      </div>
    </div>
  </div>

  <div style='display:none'>
    <div class="rule"></div>

    <h3>Network Graph</h3>
    <div class="columns equacols">
      <div class="column first">
        <dl class="keyboard-mappings">
          <dt><span class="badmono">←</span> <em>or</em> h</dt>
          <dd>Scroll left</dd>
        </dl>
        <dl class="keyboard-mappings">
          <dt><span class="badmono">→</span> <em>or</em> l</dt>
          <dd>Scroll right</dd>
        </dl>
        <dl class="keyboard-mappings">
          <dt><span class="badmono">↑</span> <em>or</em> k</dt>
          <dd>Scroll up</dd>
        </dl>
        <dl class="keyboard-mappings">
          <dt><span class="badmono">↓</span> <em>or</em> j</dt>
          <dd>Scroll down</dd>
        </dl>
        <dl class="keyboard-mappings">
          <dt>t</dt>
          <dd>Toggle visibility of head labels</dd>
        </dl>
      </div><!-- /.column.first -->
      <div class="column last">
        <dl class="keyboard-mappings">
          <dt>shift <span class="badmono">←</span> <em>or</em> shift h</dt>
          <dd>Scroll all the way left</dd>
        </dl>
        <dl class="keyboard-mappings">
          <dt>shift <span class="badmono">→</span> <em>or</em> shift l</dt>
          <dd>Scroll all the way right</dd>
        </dl>
        <dl class="keyboard-mappings">
          <dt>shift <span class="badmono">↑</span> <em>or</em> shift k</dt>
          <dd>Scroll all the way up</dd>
        </dl>
        <dl class="keyboard-mappings">
          <dt>shift <span class="badmono">↓</span> <em>or</em> shift j</dt>
          <dd>Scroll all the way down</dd>
        </dl>
      </div><!-- /.column.last -->
    </div>
  </div>

  <div >
    <div class="rule"></div>

    <h3>Source Code Browsing</h3>
    <div class="columns threecols">
      <div class="column first">
        <dl class="keyboard-mappings">
          <dt>t</dt>
          <dd>Activates the file finder</dd>
        </dl>
        <dl class="keyboard-mappings">
          <dt>l</dt>
          <dd>Jump to line</dd>
        </dl>
      </div>
    </div>
  </div>

</div>
    

    <!--[if IE 8]>
    <script type="text/javascript" charset="utf-8">
      $(document.body).addClass("ie8")
    </script>
    <![endif]-->

    <!--[if IE 7]>
    <script type="text/javascript" charset="utf-8">
      $(document.body).addClass("ie7")
    </script>
    <![endif]-->

    
    <script type='text/javascript'></script>
    
  </body>
</html>

