(function ($) {

    $.widget("jHtree.jHTree", {
        options: {
            callType: 'url',
            url: '',
            structureObj: [{}],
            zoomer: true,
            afterDropClass: 'contaftrdrop'
        },
        _init: function () {
        },
        _setOption: function (key, value) {
            this._super(key, value);
        },
        _setOptions: function (options) {
            this._super(options);
            this._createUpdate();
        },
        _createUpdate: function () {
            parentthis = this;
            //-----------------------
            if (this.options.callType == 'url') {
                $.getJSON(this.options.url, function (data) {

                })
                    .done(function (data) {

                        parentthis._constructTree(data);

                    })
                    .fail(function (err) {
                        var status = err.status;
                        var statusText = err.statusText;


                    });
            }
            if (this.options.callType == 'obj') {
                //-----------------------
                this._constructTree(this.options.structureObj);
                //-----------------------
            }



        },
        _create: function () {
            this._createUpdate();
        },
        destroy: function () {

            $.Widget.prototype.destroy.call(this);
        },

        _constructTree: function (jsonStructureObject) {

            var $tree = $(this.element);
            $tree.addClass('tree').append("<ul id='tremainul'>");

            this._walkerCursor(jsonStructureObject, 'tremainul');
            this._prepareNodes();
            this._treeDarg();
            this._treeDrop();
            this._interactionEvents();
            if (this.options.zoomer) this._zoomer($tree);
        },

        _walkerCursor: function (jsonObjs, parentLiNode) {
            for (var i = 0; i < jsonObjs.length; i++) {
                var node = jsonObjs[i];

                this._createNode(node, parentLiNode);

                if (node.children !== null && typeof node.children === "object") {
                    this._walkerCursor(node.children, node.id);
                }
            }
        },

        _createNode: function (node, parentLiNode) {
            var bfrul = '';
            var isTreemainLi = (parentLiNode === "tremainul");
            var beforeDiv = '';
            var afterDiv = '';
            var weekdata = '';
            for(let i=0 ; i < node.contents.length; i++)
            {
                if(i < node.contents.length-1)
                {  
                    weekdata += '<div class="p-2 mb-2"><span>' + node.contents[i] + '</span></div>';
                    if (i==4)
                    {
                        weekdata += '<div class="h-45px"></div>';
                    }
                }
                else if( i == node.contents.length-1)
                {
                    weekdata += '<div class="p-2"><span>' + node.contents[i] + '</span></div>';
                }
            }
            if (node.children) {
                bfrul = '<div class="bfrul"></div>';
            }
            if (!isTreemainLi) {
                // beforeDiv = '<div class="before"><div class="funcbtnb ui-state-default ui-corner-all" title="Level Focus" data-func="focus"><span class="ui-icon ui-icon-zoomin"></span></div></div>';
                // afterDiv = '<div class="after"><div class="funcbtna ui-state-default ui-corner-all" title="collapse" data-func="clps"><span class="ui-icon ui-icon-triangle-1-n"></span></div></div>';
                beforeDiv = '<div class="before"></div>';
                afterDiv = '<div class="after"></div>';
            }

            var nodeLiElements = '<li id="' + node.id + '" class="tnode" >' + beforeDiv + '<div class="trcont"><div class="ui-widget-header" id="'+node.head+'">' +
                node.head + '</div><div class="ui-widget-content">' + 
                weekdata + '</div></div><div class="trchl"><ul>' +
                bfrul + '</ul></div>' + afterDiv + '</li>';

            if (isTreemainLi) {// Firest ul
                $("#" + parentLiNode).append(nodeLiElements);
            }
            else {
                $("> .trchl > ul", "#" + parentLiNode).append(nodeLiElements);
            }
        },

        _prepareNodes: function () {

            $('.trchl').each(function (e, x) {
                var $obj = $(this);

                var $li = $($obj).find('> ul>li');
                var count = $li.length;

                if (count == 1)
                {
                    $($li).find('> .before, > .after').css("border-top", "0px");
                }
                if (count > 1) {
                    $li.first().find('> .after').css("border-top", "0px");
                    $li.last().find('> .before').css("border-top", "0px");
                }

                var chldinsidlicount = $li.find('.trchl');


                $obj.find('div[data-func]').each(function (a, o) {
                    var objbtn = $(o);
                    if (objbtn.data('func') == "reset") {
                        objbtn.show();
                        var objfocus = objbtn.parent().closest('li');
                        var objother = objfocus.parent().find('> li');
                        var targetobjs = $(objother).not(objfocus);
                        targetobjs.hide();
                    }

                    if (objbtn.data('func') == "xpnd") {
                        objbtn.show();
                        objbtn.parent().parent().find('.trchl').hide();
                    }


                });

            });
        },

        _treeDarg: function () {

        },

        _treeDrop: function () {

        },

        _interactionEvents: function () {
            
            var q1 = document.getElementById("q1").getElementsByClassName("ui-widget-content")[0].innerHTML;
            var q2 = document.getElementById("q2").getElementsByClassName("ui-widget-content")[0].innerHTML;
            var q3 = document.getElementById("q3").getElementsByClassName("ui-widget-content")[0].innerHTML;
            var q4 = document.getElementById("q4").getElementsByClassName("ui-widget-content")[0].innerHTML;
            var january = document.getElementById("january").getElementsByClassName("ui-widget-content")[0].innerHTML;
            var febuary = document.getElementById("febuary").getElementsByClassName("ui-widget-content")[0].innerHTML;
            var march = document.getElementById("march").getElementsByClassName("ui-widget-content")[0].innerHTML;
            var april = document.getElementById("april").getElementsByClassName("ui-widget-content")[0].innerHTML;
            var may = document.getElementById("may").getElementsByClassName("ui-widget-content")[0].innerHTML;
            var june = document.getElementById("june").getElementsByClassName("ui-widget-content")[0].innerHTML;
            var july = document.getElementById("july").getElementsByClassName("ui-widget-content")[0].innerHTML;
            var august = document.getElementById("august").getElementsByClassName("ui-widget-content")[0].innerHTML;
            var september = document.getElementById("september").getElementsByClassName("ui-widget-content")[0].innerHTML;
            var october = document.getElementById("october").getElementsByClassName("ui-widget-content")[0].innerHTML;
            var november = document.getElementById("november").getElementsByClassName("ui-widget-content")[0].innerHTML;
            var december = document.getElementById("december").getElementsByClassName("ui-widget-content")[0].innerHTML;
            $(".tree").on({
                mouseenter: function () {
                    var parentLi = $(this).parent();

                    parentLi.find('> .before,> .after').find('> .funcbtnb,> .funcbtna').show('blind', { direction: 'vertical' });

                    parentLi.find('.ui-widget-content').addClass('tfocus');
                    parentLi.find('.ui-widget-header').addClass('ui-state-focus');
                },
                mouseleave: function () {

                    var parentLi = $(this).parent();
                    parentLi.find('.ui-widget-content').removeClass('tfocus');
                    parentLi.find('.ui-widget-header').removeClass('ui-state-focus');

                }
            }, ".trcont,.before,.after");

            $(".tree").on('mouseleave', '.tnode', function () {

                var funcbtns = $(this).find('> .before,> .after').find('div[data-func]');
                if ($(funcbtns[0]).data('func') == "focus") {
                    $(funcbtns[0]).hide('blind', { direction: 'vertical' });
                }
                if ($(funcbtns[1]).data('func') == "clps") {
                    $(funcbtns[1]).hide('blind', { direction: 'vertical' });
                }

            });

            $(".tree").on("click", ".trcont > .ui-widget-header", function () {
                var nextnode = $(this).parent().parent().find('.trchl').first();
                nextnode.slideToggle('fast', function () {
                    // Animation complete.
                });
                let quater = this.innerHTML;
                if(this.style.length==0)
                {
                    this.style.marginBottom="0px";
                }
                else
                {
                    if(this.style.marginBottom == "0px")
                    {
                        if(quater=='Q1' || quater=='Q2' || quater=='Q3' || quater=='Q4')
                        {
                            this.style.marginBottom = "120px";
                        }
                        else
                        {
                            this.style.marginBottom = "60px";
                        }
                    }
                    else
                        this.style.marginBottom = "0px";
                }
                let nextelement = this.nextElementSibling;
                switch(quater)
                {
                    case 'Q1':
                        if(nextelement.innerHTML == q1)
                            nextelement.innerHTML='';
                        else
                        nextelement.innerHTML = q1;
                    break;
                    case 'Q2':
                        if(nextelement.innerHTML == q2)
                            nextelement.innerHTML='';
                        else
                        nextelement.innerHTML = q2;
                    break;
                    case 'Q3':
                        if(nextelement.innerHTML == q3)
                            nextelement.innerHTML='';
                        else
                        nextelement.innerHTML = q3;
                    break;
                    case 'Q4':
                        if(nextelement.innerHTML == q4)
                            nextelement.innerHTML='';
                        else
                        nextelement.innerHTML = q4;
                    break;
                    case 'Q1-Apr':
                        if(nextelement.innerHTML == april)
                            nextelement.innerHTML='';
                        else
                        nextelement.innerHTML = april;
                    break;
                    case 'Q1-May':
                        if(nextelement.innerHTML == may)
                            nextelement.innerHTML='';
                        else
                        nextelement.innerHTML = may;
                    break;
                    case 'Q1-Jun':
                        if(nextelement.innerHTML == june)
                            nextelement.innerHTML='';
                        else
                        nextelement.innerHTML = june;
                    break;
                    case 'Q2-Jul':
                        if(nextelement.innerHTML == july)
                            nextelement.innerHTML='';
                        else
                        nextelement.innerHTML = july;
                    break;
                    case 'Q2-Aug':
                        if(nextelement.innerHTML == august)
                            nextelement.innerHTML='';
                        else
                        nextelement.innerHTML = august;
                    break;
                    case 'Q2-Sep':
                        if(nextelement.innerHTML == september)
                            nextelement.innerHTML='';
                        else
                        nextelement.innerHTML = september;
                    break;
                    case 'Q3-Oct':
                        if(nextelement.innerHTML == october)
                            nextelement.innerHTML='';
                        else
                        nextelement.innerHTML = october;
                    break;
                    case 'Q3-Nov':
                        if(nextelement.innerHTML == november)
                            nextelement.innerHTML='';
                        else
                        nextelement.innerHTML = november;
                    break;
                    case 'Q3-Dec':
                        if(nextelement.innerHTML == december)
                            nextelement.innerHTML='';
                        else
                        nextelement.innerHTML = december;
                    break;
                    case 'Q4-Jan':
                        if(nextelement.innerHTML == january)
                            nextelement.innerHTML='';
                        else
                        nextelement.innerHTML = january;
                    break;
                    case 'Q4-Feb':
                        if(nextelement.innerHTML == febuary)
                            nextelement.innerHTML='';
                        else
                        nextelement.innerHTML = febuary;
                    break;
                    case 'Q4-Mar':
                        if(nextelement.innerHTML == march)
                            nextelement.innerHTML='';
                        else
                        nextelement.innerHTML = march;
                    break;
                }
            });

            $(".tree").on("click", "div[data-func]", function () {
                var objbtn = $(this);
                var objfocus = objbtn.parent().closest('li');
                var objother = objfocus.parent().find('> li');
                var targetobjs = $(objother).not(objfocus);

                var objfuncattr = objbtn.data("func");
                if (objfuncattr == 'focus' || objfuncattr == 'reset') {

                    objbtn.find('span').toggleClass('ui-icon-zoomin ui-icon-zoomout');
                    if (objfuncattr == 'focus') {


                        targetobjs.effect('fold', { direction: 'up', mode: 'hide' }, 'normal');

                        objbtn.data("func", "reset");
                        objbtn.attr("title", "Level Reset");
                    }
                    else {

                        targetobjs.effect('fold', { direction: 'up', mode: 'show' }, 'slow');
                        objbtn.data("func", "focus");
                        objbtn.attr("title", "Level Focus");
                    }
                }

                if (objfuncattr == 'clps' || objfuncattr == 'xpnd') {

                    objbtn.find('span').toggleClass("ui-icon-triangle-1-n ui-icon-triangle-1-s");
                    if (objfuncattr == 'clps') {
                        $(this).parent().parent().find('.trchl').effect('fold', { direction: 'up', mode: 'hide' }, 'slow');
                        objbtn.data('func', 'xpnd');
                        objbtn.attr("title", "Expand");
                    } else {

                        $(this).parent().parent().find('.trchl').slideDown('slow', "easeOutBounce", function () { });

                        objbtn.data('func', 'clps');
                        objbtn.attr("title", "Collapse");
                    }
                }
            });

        },

        _zoomer: function (treeDiv) {
            // var zmr = '<div class="zmrcntr"><input type="text" id="zmrval" class="zomrval"><div id="zmrslidr" style="height:200px;"></div></div>';
            // $(zmr).insertBefore($(treeDiv));

            var brwstp = navigator.userAgent.match(/Mozilla/);
            $("#zmrslidr").slider({
                orientation: "vertical",
                range: "min",
                min: 10,
                animate: 'slow',
                max: 200,
                value: 100,
                slide: function (event, ui) {
                    $("#zmrval").val(ui.value);
                    if (brwstp == true) {

                        $('.tree').css('MozTransform', 'scale(' + ui.value + ')');
                    } else {

                        $('.tree').css('zoom', ' ' + ui.value + '%');
                    }
                }
            });
            $("#zmrval").val($("#zmrslidr").slider("value"));

        }

    });

})(jQuery);
