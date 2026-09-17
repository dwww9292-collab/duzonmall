/**
* layout.js
* 공통으로 사용되는 header 를 작성한다.
*/
(function (window, document, $) {

    //document.domain = 'joins.com';
    var utils = window.utils,
		pageType = utils.config('pageType'),
		domain = utils.config('webPcPath'),
		windowSize = utils.windowSize(),
		$body = $(document.body);

    //jTracker Begin
    var jTracker = {
        siteName: "TRACKER",
        __getCookieVal: function (offset) {
            var endstr = document.cookie.indexOf(";", offset);
            if (endstr == -1) endstr = document.cookie.length;
            return unescape(document.cookie.substring(offset, endstr));
        },
        __getCookie: function (name) {
            var arg = name + "=";
            var alen = arg.length;
            var clen = document.cookie.length;
            var i = 0;
            while (i < clen) {
                var j = i + alen;
                if (document.cookie.substring(i, j) == arg) return this.__getCookieVal(j);
                i = document.cookie.indexOf(" ", i) + 1;
                if (i == 0) break;
            }
            return null;
        },
        __getCookieA: function (name1, name2) {
            var string = this.__getCookie(name1);
            if (string == null) string = "";
            var flag = string.indexOf(name2 + "=");
            if (flag != -1) {
                flag += name2.length + 1;
                var end = string.indexOf("&", flag);
                if (end == -1) end = string.length;
                return unescape(string.substring(flag, end));
            }
            else {
                return "";
            }
        },
        __request: function (param) {
            try {
                var aParams = new Array();
                var sUrlParam = document.location.search.substring(1);
                for (var nIdx = 0; nIdx < sUrlParam.split("&").length; nIdx++)
                    aParams[sUrlParam.split("&")[nIdx].split("=")[0].toString()] = sUrlParam.split("&")[nIdx].split("=")[1].toString();
                if (aParams[param]) { return aParams[param]; } else { return ""; }
            } catch (e) {
                return "";
            }
        },
        __joins_device_detect_type1: function () {
            var sDeviceCheck = "0"; // pc
            var _agent = navigator.userAgent.toLowerCase();
            if (_agent.indexOf("iphone") != -1 || _agent.indexOf("ipod") != -1) sDeviceCheck = "2";
            else if (_agent.indexOf("ipad") != -1) sDeviceCheck = "4";
            else if (_agent.indexOf("android") != -1) {
                if (_agent.indexOf("mobile") != -1) sDeviceCheck = "1";
                else sDeviceCheck = "3";
            }
            else {
                var mobile = (/blackberry|mini|windows\sce|palm/i.test(_agent));
                if (mobile) sDeviceCheck = "5";
                else {
                    if (_agent.indexOf("mac") != -1) sDeviceCheck = "8";
                    else if (_agent.indexOf("x11") != -1) sDeviceCheck = "9";
                }
            }
            return sDeviceCheck;
        },
        __get_browser: function () {
            var ua = navigator.userAgent, tem, M = ua.match(/(opera|chrome|safari|firefox|msie|trident(?=\/))\/?\s*(\d+)/i) || [];
            if (/Edge/i.test(ua)) {
                tem = /(edge)\/((\d+)?[\w\.]+)/ig.exec(ua) || [];
                return "Edge%20" + (tem[3] || "");
            }
            if (/trident/i.test(M[1])) {
                tem = /\brv[ :]+(\d+)/g.exec(ua) || [];
                return "IE%20" + (tem[1] || "");
            }
            if (M[1] === "Chrome") {
                tem = ua.match(/\bOPR\/(\d+)/)
                if (tem != null) return "Opera%20" + tem[1];
            }
            if (navigator.appName.length > 0 && navigator.appVersion.charCodeAt(0) < 128) {
                M = (typeof (M[2]) != "undefined" && M[2]) ? [M[1], M[2]] : [navigator.appName, navigator.appVersion];
                if ((tem = ua.match(/version\/(\d+)/i)) != null) M.splice(1, 1, tem[1]);
                return M.join("%20");
            }
            else {
                return ua;
            }
        },
        __get_os: function () {
            var os = "";
            var clientStrings = [
				{ s: 'Windows 3.11', r: /Win16/ },
				{ s: 'Windows 95', r: /(Windows 95|Win95|Windows_95)/ },
				{ s: 'Windows ME', r: /(Win 9x 4.90|Windows ME)/ },
				{ s: 'Windows 98', r: /(Windows 98|Win98)/ },
				{ s: 'Windows CE', r: /Windows CE/ },
				{ s: 'Windows 2000', r: /(Windows NT 5.0|Windows 2000)/ },
				{ s: 'Windows XP', r: /(Windows NT 5.1|Windows XP)/ },
				{ s: 'Windows Server 2003', r: /Windows NT 5.2/ },
				{ s: 'Windows Vista', r: /Windows NT 6.0/ },
				{ s: 'Windows 7', r: /(Windows 7|Windows NT 6.1)/ },
				{ s: 'Windows 8.1', r: /(Windows 8.1|Windows NT 6.3)/ },
				{ s: 'Windows 8', r: /(Windows 8|Windows NT 6.2)/ },
				{ s: 'Windows 10', r: /Windows NT 10.0/ },
				{ s: 'Windows NT 4.0', r: /(Windows NT 4.0|WinNT4.0|WinNT|Windows NT)/ },
				{ s: 'Windows ME', r: /Windows ME/ },
				{ s: 'Android', r: /Android/ },
				{ s: 'Open BSD', r: /OpenBSD/ },
				{ s: 'Sun OS', r: /SunOS/ },
				{ s: 'Linux', r: /(Linux|X11)/ },
				{ s: 'iOS', r: /(iPhone|iPad|iPod)/ },
				{ s: 'Mac OS X', r: /Mac OS X/ },
				{ s: 'Mac OS', r: /(MacPPC|MacIntel|Mac_PowerPC|Macintosh)/ },
				{ s: 'QNX', r: /QNX/ },
				{ s: 'UNIX', r: /UNIX/ },
				{ s: 'BeOS', r: /BeOS/ },
				{ s: 'OS/2', r: /OS\/2/ },
				{ s: 'Search Bot', r: /(nuhk|Googlebot|Yammybot|Openbot|Slurp|MSNBot|Ask Jeeves\/Teoma|ia_archiver)/ }
            ];

            for (var id in clientStrings) {
                var cs = clientStrings[id];
                if (cs.r.test(navigator.userAgent)) {
                    os = cs.s;
                    break;
                }
            }

            var osVersion = "";
            try {
                if (/Windows/.test(os)) {
                    osVersion = /Windows (.*)/.exec(os)[1];
                    os = 'Windows';
                }
                switch (os) {
                    case 'Mac OS X':
                        osVersion = /Mac OS X (10[\.\_\d]+)/.exec(navigator.userAgent)[1];
                        break;
                    case 'Android':
                        osVersion = /Android ([\.\_\d]+)/.exec(navigator.userAgent)[1];
                        break;
                    case 'iOS':
                        osVersion = /OS (\d+)_(\d+)_?(\d+)?/.exec(navigator.appVersion);
                        osVersion = osVersion[1] + '.' + osVersion[2] + '.' + (osVersion[3] | 0);
                        break;
                }
            }
            catch (e) {
            }
            return os.replace(" ", "%20") + (osVersion == "" ? "" : "%20" + osVersion);
        },
        put: function () {
            var _ref = document.referrer;
            var _ref_param = "";
            var _tmpPos = _ref.indexOf("?");
            if (_tmpPos != -1) { _ref_param = _ref.substring(_tmpPos + 1).replace(/\^/g, "-"); _ref = _ref.substring(0, _tmpPos); }
            var _uri = document.location.href;
            var _uri_param = "";
            var _tmpPos = _uri.indexOf("?");
            if (_tmpPos != -1) { _uri_param = _uri.substring(_tmpPos + 1).replace(/\^/g, "-"); _uri = _uri.substring(0, _tmpPos); }
            var _dt = this.__joins_device_detect_type1();
            var _br = this.__get_browser();
            var _os = this.__get_os();
            var _w = window.screen.width;
            var _h = window.screen.height;
            var _joins_memid = this.__getCookieA("MemArray", "MemID"); if (_joins_memid == null) _joins_memid = "";
            var _joins_pcid = this.__getCookie("PCID"); if (_joins_pcid == null) _joins_pcid = "";
            var _href = "https://counter.joins.com/bin/ArticleCounterLogger.dll?Total_ID=" + _br + "&Ctg_ID=" + _os + "&cloc=" + _joins_pcid + "&svc=" + this.siteName + "&memid=" + _joins_memid + "&comm1=" + _dt + "&comm3=" + _w + "x" + _h + "&comm2=" + encodeURIComponent(_uri) + "&ref=" + encodeURIComponent(_ref) + "&Master_Code=" + encodeURIComponent(_uri_param) + "&gubun=" + encodeURIComponent(_ref_param);

            var _ifrm = document.createElement("IFRAME");
            _ifrm.setAttribute("src", _href);
            _ifrm.style.width = "0px";
            _ifrm.style.height = "0px";
            _ifrm.style.display = "none";
            document.body.appendChild(_ifrm);
        }
    };
    //jTracker End

    // link : {href, target, text[, html]}
    // image : {src, alt}
    setConfigLoginInfo();

    //jTracker Exec
    /*$(function ($) {
        jTracker.siteName = "TRACKERJA";
        jTracker.put();
    });*/

    function setConfigLoginInfo() {
        var id = utils.getCookie(COOKIE_NAMES.userId) || '';
        utils.config(CONFIG_NAMES.isLogin, !id.isEmpty());
    }

    utils.linkService = new function () {
        var
			mapData = {
			    service: [
			        { key: 'joongangilbo', link: { text: '중앙일보', href: 'https://www.joongang.co.kr/', target: '_blank' } },
			        { key: 'joongangsunday', link: { text: '중앙SUNDAY', href: 'https://news.joins.com/Sunday', target: '_blank' } },
					{ key: 'ilgansports', link: { text: '일간스포츠', href: 'https://isplus.joins.com/', target: '_blank' } },
					{ key: 'koreajoongangdaily', link: { text: 'Korea Joongang Daily', href: 'https://koreajoongangdaily.joins.com', target: '_blank' } },
					{ key: 'koreadaily', link: { text: 'The Korea Daily', href: 'https://www.koreadaily.com', target: '_blank' } },
					{ key: 'joind', link: { text: '조인디', href: 'https://joind.io/', target: '_blank' } },
					
					{ key: 'jtbc', link: { text: 'JTBC', href: 'http://www.jtbc.co.kr', target: '_blank' } },
					{ key: 'jtbc2', link: { text: 'JTBC2', href: 'https://jtbc2.joins.com', target: '_blank' } },
					{ key: 'jtbc3foxsports', link: { text: 'JTBC GOLF&SPORTS', href: 'http://jtbcgolfnsports.joins.com/', target: '_blank' } },
                    { key: 'jtbc4', link: { text: 'JTBC4', href: 'http://jtbc4.joins.com', target: '_blank' } },
                    { key: 'jtbcgolf', link: { text: 'JTBC GOLF', href: 'http://jtbcgolf.joins.com/', target: '_blank' } },
                    { key: 'jtbcworldwide', link: { text: 'JTBC worldwide', href: 'http://www.jtbcworldwide.com', target: '_blank' } },

                    { key: 'megabox', link: { text: '메가박스', href: 'https://www.megabox.co.kr/', target: '_blank' } },
                    { key: 'filmhome', link: { text: '필름 소사이어티', href: 'http://www.megabox.co.kr/?menuId=specialcontent-filmHome&majorCode=06&minorCode=0601', target: '_blank' } },
                    { key: 'classichome', link: { text: '클래식 소사이어티', href: 'http://www.megabox.co.kr/?menuId=specialcontent-classicHome&majorCode=02&minorCode=0208', target: '_blank' } },
                    { key: 'phoenixhnr', link: { text: '휘닉스 호텔앤드리조트', href: 'https://phoenixhnr.co.kr/page/main', target: '_blank' } },
                    { key: 'phoenixhnrpyeongchang', link: { text: '휘닉스 평창', href: 'https://phoenixhnr.co.kr/page/main/pyeongchang', target: '_blank' } }, 
                    { key: 'phoenixhnrjeju', link: { text: '휘닉스 섭지코지', href: 'https://phoenixhnr.co.kr/page/main/jeju', target: '_blank' } },

                    { key: 'monthlyjoongang', link: { text: '월간중앙', href: 'http://jmagazine.joins.com/monthly', target: '_blank' } },
                    { key: 'economist', link: { text: '이코노미스트', href: 'http://jmagazine.joins.com/economist', target: '_blank' } },
                    { key: 'forbeskorea', link: { text: '포브스코리아', href: 'http://jmagazine.joins.com/forbes', target: '_blank' } },
                    { key: 'jbooks', link: { text: '중앙북스', href: 'http://jbooks.joins.com', target: '_blank' } },
                    { key: 'elle', link: { text: '엘르', href: 'http://www.elle.co.kr', target: '_blank' } },
                    { key: 'harpersbazaar', link: { text: '바자', href: 'http://harpersbazaar.co.kr/', target: '_blank' } },
                    { key: 'cosmopolitan', link: { text: '코스모폴리탄', href: 'http://cosmopolitan.joins.com', target: '_blank' } },
                    { key: 'esquirekorea', link: { text: '에스콰이어', href: 'http://esquirekorea.co.kr/', target: '_blank' } },
                    
                    { key: 'joinsland', link: { text: '조인스랜드', href: 'http://www.joinsland.com', target: '_blank' } },
                    { key: 'jhealthmedia', link: { text: '헬스미디어', href: 'http://www.jhealthmedia.com', target: '_blank' } },
                    { key: 'chinajoins', link: { text: '차이나랩', href: 'http://china.joins.com', target: '_blank' } },
                    { key: 'koreanjoins', link: { text: '어문연구소', href: 'http://korean.joins.com', target: '_blank' } },
                    { key: 'jdphone', link: { text: '영어의신', href: 'http://www.jdphone.com/', target: '_blank' } },
                    { key: 'esukorea', link: { text: 'ESU', href: 'https://www.esukorea.org/', target: '_blank' } },
                    
                    { key: 'joins', link: { text: 'JOINS PRIME', href: 'http://www.joins.com', target: '_blank' } },
                    { key: 'ssully', link: { text: '썰리', href: 'http://ssully.joins.com', target: '_blank' } },
                    { key: 'folin', link: { text: 'fol:in', href: 'https://folin.co/', target: '_blank' } },
                    { key: 'jtbcnow', link: { text: 'JTBC NOW', href: 'http://jtbcnow.com/', target: '_blank' } },
                    { key: 'jtbcnews', link: { text: 'JTBC NEWS', href: 'https://play.google.com/store/apps/details?id=com.jtbc.news', target: '_blank' } },
                    { key: 'oohmedia', link: { text: 'OOH MEDIA', href: 'http://oohmedia.kr/', target: '_blank' } },
                    { key: 'jmembership', link: { text: '중앙멤버십', href: 'https://jmembership.joins.com/', target: '_blank' } },
                    { key: 'sigol', link: { text: '렛츠고시골', href: 'http://sigol.joinsland.com/', target: '_blank' } },
                    { key: 'tj4', link: { text: 'TJ4대전충청', href: 'http://tj4.joinsland.com/', target: '_blank' } },
                    
                    { key: 'customercenter', link: { text: '고객센터', href: 'http://news.joins.com/customercenter' } },
                    { key: 'onlinecustomercenter', link: { text: '온라인 고객센터', href: 'http://help.joins.com' } },
                    { key: 'joongangad', link: { text: '광고 안내', href: 'http://jad.joongang.co.kr' } },
                    { key: 'joongangbiz', link: { text: '제휴문의', href: 'mailto:digitalbiz@joongang.co.kr' } },
                    { key: 'joongangterms', link: { text: '회원약관', href: 'http://bbs.joins.com/app/myjoins_policy/163114' } },
                    { key: 'joongangpolicy', link: { text: '개인정보 취급방침', href: 'http://bbs.joins.com/app/myjoins_policy/163117' } },
                    { key: 'youthprotection', link: { text: '청소년 보호정책', href: 'http://bbs.joins.com/app/myjoins_policy/2777964' } },
                    { key: 'login', link: { text: '로그인', href: 'https://my.joins.com/login/', cls: 'login' } },
                    { key: 'joongangmedia', link: { text: '중앙미디어네트워크', href: 'http://jmedianet.com' } },
			    ]
			};
        this.getData = function (key, obj) {
            var data = {},
				rtnObj = {};

            if (key) {
                data = mapData.service.filter(function (v) {
                    return v.key == key;
                })[0];
            }
            $.extend(true, rtnObj, data, { link: obj || {} });

            return rtnObj;
        };
    };

    utils.getLinkData = function (key) {
        var rtnHtml = ""
        rtnHtml = "<a href='" + utils.linkService.getData(key).link.href + "' target='" + utils.linkService.getData(key).link.target + "'>" + utils.linkService.getData(key).link.text + "</a>";
        return rtnHtml;
    };

    window.layout = new function Layout() {
        var _layout = this,
			gnb,
			header,
			footer,
			$gnb = $('#gnb'),
			$body = $(document.body),
			menuKey = utils.menu.getPageMenuKey(),
			arrKey = menuKey.split(','),
			lastMenuKey = arrKey[arrKey.length - 1];

        (function init() {
            _layout.gnb = new Gnb();
        })();

        this.render = function () {
            var articleType = utils.config('articleType'),
				pageType = utils.config('pageType');

            _layout.gnb.render();
        };

        function Gnb() {
            var _gnb = this,
				gnbStyle = 'general', // general, gray, black
				data = {
				    slogo: utils.linkService.getData('joins', { html: '<em>Joins</em>' }),
				    family_site: [
                        { link: { pCls: 'jmnet', html: '<em>중앙그룹 <span>브랜드</span></em>', href: '#jmnet_more', cls: 'jmnet_more', title: '중앙그룹 브랜드 레이어 열기' } }
				    ],
				},
				layerJmnet = {
				    directives: {
				        groups: {
				            cols: {
				                'class': function () {
				                    return this.cls;
				                },
				                list: { link: utils.decorators.link },
				                listinfo: {
				                    'class': function () {
				                        return this.cls;
				                    },
				                    html: function (params) {

				                        var html = '';
				                        if (this && this.title) {
				                            html = '<dt class="mg"><a href="#none">' + this.title + '</a></dt>';
				                        } else {
				                            html = '<dt></dt>';
				                        }
				                        $(params.element).find('span').prepend(html);
				                    }
				                }
				            }
				        }
				    }
				},
				directives = {
				    //slogo: { link: utils.decorators.link },
				    family_site: {
				        item: {
				            pCls: function (params) {
				                if (this.link.pCls) {
				                    ele = params.element;
				                    $(ele).addClass(this.link.pCls);
				                }
				            }
				        },
				        link: utils.decorators.link
				    },
				    login: { link: utils.decorators.link }
				};

            this.render = function (targetId) {

                var html = '',
					jmnetHtml = '',
					$jmnetLayer = $('#layer_jmnet');

                targetId = targetId || 'gnb';

                if (gnbStyle == 'black' || utils.config('articleType') == ARTICLE_TYPE.cover) {
                    html += '<span class="back_mask"></span>';
                }
                html += '<div class="doc">';
                //html += '   <strong class="slogo" ><a href="#" data-bind="link"><em>Joins</em></a></strong>';
                html += '   <strong class="slogo" ><a href="https://www.joongang.co.kr/" data-bind="link" target="_blank" title="중앙일보"><em>Joins</em></a></strong>';
                //html += '   <div class="gnb_doc">';
                //html += '	   <h2 class="hidden">패밀리 사이트</h2>';
                //html += '	   <ul class="family_site">';
                //html += '		   <li data-bind="item"><a href="#" data-bind="link"></a></li>';
                //html += '	   </ul>';
                //html += '   </div>';
                html += '</div>';

                jmnetHtml += "<div id='layer_jmnet' style='display:none;' class='layer_jmnet'>";
                jmnetHtml += "<span class='mask'></span><span class='shadow_btm'></span><span class='shadow_md'></span><span class='shadow_rt'></span>";
                jmnetHtml += "<ul class='area1'>";
                jmnetHtml += "<li class='a'>";
                jmnetHtml += "<dl>";
                jmnetHtml += "<dt>신문</dt>";
                jmnetHtml += "<dd>" + utils.getLinkData("joongangilbo") + "</dd>";
                jmnetHtml += "<dd>" + utils.getLinkData("joongangsunday") + "</dd>";
                jmnetHtml += "<dd>" + utils.getLinkData("ilgansports") + "</dd>";
                jmnetHtml += "<dd>" + utils.getLinkData("koreajoongangdaily") + "</dd>";
                jmnetHtml += "<dd>" + utils.getLinkData("koreadaily") + "</dd>";
                jmnetHtml += "<dd>" + utils.getLinkData("joind") + "</dd>";
                jmnetHtml += "</dl>";
                jmnetHtml += "</li>";
                jmnetHtml += "<li class='b'>";
                jmnetHtml += "<dl>";
                jmnetHtml += "<dt>방송</dt>";
                jmnetHtml += "<dd>" + utils.getLinkData("jtbc") + "</dd>";
                jmnetHtml += "<dd>" + utils.getLinkData("jtbc2") + "</dd>";
                jmnetHtml += "<dd>" + utils.getLinkData("jtbc3foxsports") + "</dd>";
                jmnetHtml += "<dd>" + utils.getLinkData("jtbc4") + "</dd>";
                jmnetHtml += "<dd>" + utils.getLinkData("jtbcgolf") + "</dd>";
                jmnetHtml += "<dd>" + utils.getLinkData("jtbcworldwide") + "</dd>";
                jmnetHtml += "</dl>";
                jmnetHtml += "</li>";
                jmnetHtml += "<li class='b'>";
                jmnetHtml += "<dl> <dt>멀티플렉스 & 레저</dt>";
                jmnetHtml += "<dd>" + utils.getLinkData("megabox") + "</dd>";
                jmnetHtml += "<dd>" + utils.getLinkData("filmhome") + "</dd>";
                jmnetHtml += "<dd>" + utils.getLinkData("classichome") + "</dd>";
                jmnetHtml += "<dd>" + utils.getLinkData("phoenixhnr") + "</dd>";
                jmnetHtml += "<dd>" + utils.getLinkData("phoenixhnrpyeongchang") + "</dd>";
                jmnetHtml += "<dd>" + utils.getLinkData("phoenixhnrjeju") + "</dd>";
                jmnetHtml += "</dl>";
                jmnetHtml += "</li>";
                jmnetHtml += "</ul>";

                jmnetHtml += "<ul class='area2'>";
                jmnetHtml += "<li>";
                jmnetHtml += "<dl> <dt>매거진 &amp; 출판</dt>";
                jmnetHtml += "<dd>" + utils.getLinkData("monthlyjoongang") + "</dd>";
                jmnetHtml += "<dd>" + utils.getLinkData("economist") + "</dd>";
                jmnetHtml += "<dd>" + utils.getLinkData("forbeskorea") + "</dd>";
                jmnetHtml += "<dd>" + utils.getLinkData("jbooks") + "</dd>";
                jmnetHtml += "</dl>";
                jmnetHtml += "</li>";
                jmnetHtml += "<li class='c'>";
                jmnetHtml += "<dl> <dt></dt>";
                jmnetHtml += "<dd>" + utils.getLinkData("elle") + "</dd>";
                jmnetHtml += "<dd>" + utils.getLinkData("harpersbazaar") + "</dd>";
                jmnetHtml += "<dd>" + utils.getLinkData("cosmopolitan") + "</dd>";
                jmnetHtml += "<dd>" + utils.getLinkData("esquirekorea") + "</dd>";
                jmnetHtml += "</dl>";
                jmnetHtml += "</li>";
                jmnetHtml += "</ul>";

                jmnetHtml += "<ul class='area3'>";
                jmnetHtml += "<li class='d'>";
                jmnetHtml += "<dl> <dt>전문 콘텐트</dt>";
                jmnetHtml += "<dd>" + utils.getLinkData("joinsland") + "</dd>";
                jmnetHtml += "<dd>" + utils.getLinkData("jhealthmedia") + "</dd>";
                jmnetHtml += "<dd>" + utils.getLinkData("chinajoins") + "</dd>";
                jmnetHtml += "<dd>" + utils.getLinkData("koreanjoins") + "</dd>";
                jmnetHtml += "<dd>" + utils.getLinkData("jdphone") + "</dd>";
                jmnetHtml += "<dd>" + utils.getLinkData("esukorea") + "</dd>";
                jmnetHtml += "</dl>";
                jmnetHtml += "</li>";
                jmnetHtml += "</ul>";

                jmnetHtml += "<ul class='area2'>";
                jmnetHtml += "<li class='d'>";
                jmnetHtml += "<dl> <dt>서비스</dt>";
                jmnetHtml += "<dd>" + utils.getLinkData("joins") + "</dd>";
                jmnetHtml += "<dd>" + utils.getLinkData("ssully") + "</dd>";
                jmnetHtml += "<dd>" + utils.getLinkData("folin") + "</dd>";
                jmnetHtml += "<dd>" + utils.getLinkData("jtbcnow") + "</dd>";
                jmnetHtml += "<dd>" + utils.getLinkData("jtbcnews") + "</dd>";
                jmnetHtml += "<dd>" + utils.getLinkData("oohmedia") + "</dd>";
                jmnetHtml += "</dl>";
                jmnetHtml += "</li>";
                jmnetHtml += "<li class='c'>";
                jmnetHtml += "<dl class='xline'> <dt></dt>";
                jmnetHtml += "<dd>" + utils.getLinkData("jmembership") + "</dd>";
                jmnetHtml += "<dd>" + utils.getLinkData("sigol") + "</dd>";
                jmnetHtml += "<dd>" + utils.getLinkData("tj4") + "</dd>";
                jmnetHtml += "</dl>";
                jmnetHtml += "</li>";
                jmnetHtml += "</ul>";
                jmnetHtml += "</div>";

                $gnb = $('#' + targetId);

                $gnb.html(html).render(data, directives);
                $gnb.find('.gnb_doc').append(jmnetHtml);
                $gnb.on('click', 'a.jmnet_more', function () {

                    var $jmnetLayer = $('.layer_jmnet', $gnb),
						$parent = $(this).parent();

                    if ($jmnetLayer.css('display') == 'none') {
                        $jmnetLayer.fadeIn(200);
                    } else {
                        $jmnetLayer.hide();
                    }

                    $parent.toggleClass('jmnet_open');

                    return false;
                });

                function closeJmnet() {
                    $('.layer_jmnet', $gnb).hide();
                }

                $(document.body).on('click', function (e) {
                    var $target = $(utils.getElementFromEvent(e));

                    if ($target.closest('.layer_jmnet').length === 0) {
                        closeJmnet();
                    }
                });
            };

            this.renderHtml = function (styleType) {
                gnbStyle = styleType || 'general'; // general, gray, black
                var gnbId = 'gnb',
                    cssHref = window.GNB_STYLES[gnbStyle];

                if (!cssHref) {
                    gnbStyle = 'general';
                    cssHref = window.GNB_STYLES.general;
                }
                
                $('head').append('<link type="text/css" href="' + cssHref + '" rel="stylesheet" />')
                
                document.write('<div id="' + gnbId + '" class="joins_gnb gnb_joins_service"></div>');
                _gnb.render(gnbId);
            };
        };

    };

    function header_fixed(){
        var st = $(window).scrollTop();
        if(st > 32){
            $(".rooftop").addClass("active");
        }else{
            $(".rooftop").removeClass("active");
        }
        $(window).scroll(function(){
            var st = $(window).scrollTop();
            if(st > 32){
                $(".rooftop").addClass("active");
            }else{
                $(".rooftop").removeClass("active");
            }
        });
    }
    header_fixed();
})(window, document, jQuery);