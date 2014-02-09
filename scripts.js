	window.onload = function(){
		console.log("load window");
		conv();
	}
	function cb_onkeyup_code(){
		console.log("cb_onkeyup_code");
		conv();
	}
	function cb_line_number_checkbox(){
		console.log("cb_line_number_checkbox");
		var obj_is_lnum = document.getElementById('is_line_number');
		var obj_kind_lnum = document.getElementById('kind_line_number');
		if (obj_is_lnum.checked){
			obj_kind_lnum.disabled = false;
		}
		else {
			obj_kind_lnum.disabled = true;
		}
		conv();
	}
	function cb_kind_line_number(){
		console.log("cb_kind_line_number");
		conv();
	}
	function cb_kind_syntax(){
		console.log("cb_kind_syntax");
		conv();
	}
	function cb_kind_tab(){
		console.log("cb_kind_tab");
		conv();
	}

	function conv(){
		console.log("conv");
		var obj_is_lnum = document.getElementById('is_line_number');

		var obj_code = document.getElementById('code');
		var obj_preview = document.getElementById('preview');
		var obj_output = document.getElementById('html_output');
		var obj_syntax = document.getElementById('kind_syntax');
		var code = obj_code.value;
		//console.log(code);

		// HTMLで表示できない記号を特殊文字に変換する
		code = htmlspecialchars(code);
		// シンタックスハイライトを行う
		var kind_syntax = obj_syntax.options[obj_syntax.selectedIndex].value;
		if (kind_syntax == 'html'){
			code = syntax_html(code);
		}else if (kind_syntax == 'c'){
			code = syntax_c(code);
		}else{
			console.log('invalid syntax_kind :"' + kind_syntax +'"');
		}
		// HTML改行を付与する
		code = add_linefeed(code);
		// 行番号を付与する
		if (obj_is_lnum.checked){
			// FIXME: 改行種別を判定する
			code = add_linenumber(code);
		}
		// 枠(および標準の装飾)を付与する
		code = add_border(code);

		// ソースを表示する
		obj_preview.innerHTML = code;
		obj_output.value = code;
	}


	// 外枠を追加する
	function add_border(code){
		code = '<div style="font-family: monospace; '
			+ ' background-color: #fcfcfc; '
			+ ' border: 1px solid #ccbbcc; ">' + "\n"
				+ code + "\n"
				+ "</div>\n"
		return code;
	}

	// HTML改行(行末<br />)を加える
	function add_linefeed(code){
		//code=code.replace(/^(.*)$/mg,"$1<br />");
		code = code.replace(/\n/g,"<br />\n");
		return code;
	}

	// 論理行番号を加える
	function add_linenumber(code){
		var new_code = '';
		var codes = new Array();
		codes = code.split("\n");
		var ofs = 2;	// 行番号の文字数
		if (99 < codes.length){
			ofs = 4;
		}
		for (var i = 0 ; i < codes.length ; i++){
			var slnum = String(i+1);
			for (var order = slnum.length; order < 3; order++){
				console.log('lo:' + order);
				slnum = '&nbsp;' + slnum;
			}
			new_code += slnum + '| ' + codes[i] + "\n";
		}
		return new_code;
	}

	// HTMLタグなどをエスケープする
	function htmlspecialchars(code) { 
		code = code.replace(/&/g,"&amp;") ;
		code = code.replace(/"/g,"&quot;") ;
		code = code.replace(/'/g,"&#039;") ;
		code = code.replace(/</g,"&lt;") ;
		code = code.replace(/>/g,"&gt;") ;
		// 半角空白を処理する
		//code = code.replace(/ /g,"&#32;") ;
		code = code.replace(/\x20/g,"&ensp;") ;
		// タブを処理する
		var tab = '<pre style="margin-top:0pt;margin-bottom:0pt;'
			+ 'display: inline-block; _display: inline;" >&#x0009;</pre>' + "";
		code = code.replace(/\t/g, tab);
		return code ;
	}

	// HTMLシンタックスハイライト
	function syntax_html(code, tag_color, comment_color){
		// htmlをタグで切り分ける
		code = html_spliter(code);
		// キーワード(予約語)ハイライト
		//code = html_keyword(code);
		return code;
	}

	function html_spliter(code){
		var src = code;
		var dst = '';	// 処理済み文字列
		// タグが見つからなくなるまでまでループ
		// タグ前、タグおよびその中身、タグ後に切り分ける
		while (null !== (src_match = src.match(/([\s\S]*?)(&lt;(?:.*?)&gt;)([\s\S]*)/))){
			//console.log('detect tag:' +src_match[2]);
			dst += src_match[1];	// タグ前を処理済み文字列に連結
			dst += html_tab_syntax(src_match[2]);	// タブ内の属性と値をハイライト
			// 未処理部分はscriptタグであるか否かで扱いが異なる
			if (-1 != src_match[2].search(/&lt;\s*script/i)){
				// scriptタグを検出したので、</script>までJSとしてハイライトを行う
				if (null === (js_match = src_match[3].match(/([\s\S]*?)(&lt;.?script.*?&gt;[\s\S]*)/i))){
					// scriptタグが末尾に到達しなかったので未処理文字列をすべてJS扱いした後にbreak;
					console.log('script tag footer is not detect');
					dst += js_syntax(src_match[3]);
					src = '';
				}else{
					// console.log('script tag footer detect');
					// 末尾までをハイライトする。
					dst += js_syntax(js_match[1]);
					//dst += js_match[];
					src = js_match[2];
				}
			}
			else if( src_match[2].search(/&lt;\?php/i)){
				// PHPタグを検出したので、?>までPHPとしてハイライトを行う
				// 未実装!
				src = src_match[3];		// 残りのすべてを次の未処理文字列へ。
			}else{
				src = src_match[3];		// 残りのすべてを次の未処理文字列へ。
			}
		}
		// ここに来た時点で残っている未処理文字列を処理済みに連結
		dst += src;
		return dst;
	}

	function js_syntax(code){
		// console.log('catch js:'+ code);
		return code;
	}


	function html_tab_syntax(code){
		// console.log('html_tag_syntax :' + code);
		code = html_keyword(code);
		// タグ(<>)をカラー表示
		if (typeof tag_color === "undefined"){
			tag_color = '#008800'; // 緑
		}
		if (typeof comment_color === "undefined"){
			comment_color = '#2266aa'; // 青
		}
		replace = '<span style="color:' + tag_color + '">$1</span>';
		code = code.replace(/(&lt;([\s\S]*?)&gt;)/, replace);
		replace = '<span style="color:' + comment_color + '">$1</span>';
		code = code.replace(/(&lt;!([\s\S]*?)&gt;)/g, replace);

		return code;
	}

	// HTMLキーワード(予約語)ハイライト
	function html_keyword(code){
		var regex;
		// <>で囲われた範囲内の予約後をハイライトする
		// 要素レベル
		// var keywords = (head|body|h[0-9]|br|div|font
		//		|form|input|select|option)(.*&gt;)/');

		var keywords = new Array('style', 'width', 'height', 'class', 'id', 
				'action', 'method', 'type', 'name', 'value',
				'rel', 'href', 'src', 'rows', 'cols',
				'http-equiv', 'content', 'charset', 'enctype', 'size');
		for ( var i = 0; i < keywords.length; i++){
			// 属性レベル
			// 注意：置換済みの空白が書き換わった際に追従する必要がある
			regex = new RegExp('(&lt;.*?&ensp;)('+ keywords[i] +')((?:.*?;?)=(?:.*?;?))(&quot;.*?&quot;)(.*&gt;)', 'g');
			var attr_color = '#000088'; // 属性色
			var value_color = '#880000'; // 値色
			replace = '$1<span style="color:' + attr_color + '">$2</span>$3'
				+ '<span style="color:' + value_color + '">$4</span>$5';
			code = code.replace(regex, replace);
		}
		return code;
	}

	// C系言語をシンタックスハイライトする
	function syntax_c(code){
		return code;
	}

