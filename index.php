<html>
<head>
	<meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
	<title>highlight builder</title>
	<!--
	<link rel="shortcut icon" href="icon.ico">
	-->
	<script type="text/javascript" src="scripts.js"></script>
	<LINK href="style.css" rel="stylesheet" type="text/css">
	<script type="text/javascript" src="tracks.js"></script>



</head>
<body>
	<h1>SSSH<font size="-1"> -Standalone Static Syntax Highlight builder-</font></h1>
<div class="left">
	<h2>使い方</h2>
	<div class="text">
	・「ソースコード」にコードを貼る<br />
	・「プレビュー」「HTML」に結果が表示される<br />
	・「HTML」をコピーして、コードを表示したいページに貼り付ける<br />
	<br />
	ソースコードを表示可能なHTMLに変換します。
	簡素なシンタックスハイライトを付けることができます。<br />
	ライブラリをWebページに読み込む必要はありません。<br />
	</div>
	<!--
	詳しい使い方などは開発者の<a href=>ブログ記事</a>をご覧ください<br />
	-->
		<h3>設定</h3>
		行番号:
		<input type="checkbox" name="is_line_number" checked 
		 id="is_line_number" onclick="cb_line_number_checkbox()">
		<select name="kind_line_number"
		 id="kind_line_number" onclick="cb_kind_line_number()">
			<option value="plain">プレーンテキスト</option>
			<!--
			<option value="js">動的(JavaScript使用) 未実装</option>
			<option value="js_css">動的(JS,CSS使用) 未実装</option>
			-->
		</select>
		<br />
		<font size="-2">※プレーンテキスト行番号を使うと、コードがコピーペーストしずらくなってしまいます</font>
		<br />
		シンタックスハイライト:
		<select name="kind_syntax" id="kind_syntax" onclick="cb_kind_syntax()">
			<option value="html">HTML系(HTML,PHP,JS,CSS)</option>
			<option value="c">C言語系(未実装)</option>
			<option value="none">使用しない</option>
		</select>
		<br />
		<!--
		TABの扱い:
		<select name="kind_tab" id="kind_tab" onclick="cb_kind_tab()">
			<option value="span">フルサイズ(8タブ表示 spanタグ)</option>
			<option value="escape">エスケープ(2~4タブ表示 &#x 0009;)</option>
		</select>
		-->
		<h3> ソースコード：<font size="-1">(ここに貼り付けます)</font></h3>
		<textarea rows="5" style="width:90%" 
		 id='code'
		 onkeyup="cb_onkeyup_code()">
		 <div>hello html</div>
		 <span style="color:blue">blue text</span>
#include <stdio.h>
int main(){
return 0;
}

<div>
class1
</div>
</textarea>
		<br />
		<h3>プレビュー:</h3>
		<div id="preview" style="border : 3px solid #eeeeff; width:90%" ></div>
		<h3>HTML:</h3>
		<textarea style="width:90%" 
		 cols="50" rows="12" id="html_output" readonly>
		</textarea>
		<br />
	</div>
	<div class="right">
		<br />
		<script async src="//pagead2.googlesyndication.com/pagead/js/adsbygoogle.js"></script>
	<!-- sssh-ad2-300x600 -->
		<ins class="adsbygoogle"
		style="display:inline-block;width:300px;height:600px"
		data-ad-client="ca-pub-5057531329998733"
		data-ad-slot="1781522409"></ins>
		<script>
			(adsbygoogle = window.adsbygoogle || []).push({});
		</script>
	</div>
	<div class="clearfix">
		<script async src="//pagead2.googlesyndication.com/pagead/js/adsbygoogle.js"></script>
		<!-- sssh-ad1 -->
		<ins class="adsbygoogle"
			style="display:inline-block;width:728px;height:90px"
				data-ad-client="ca-pub-5057531329998733"
				data-ad-slot="9583990806"></ins>
		<script>
			(adsbygoogle = window.adsbygoogle || []).push({});
		</script>
	</div>
</body>
</html>
