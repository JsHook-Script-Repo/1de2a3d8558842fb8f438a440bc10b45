var Mod = {
    name: '明日方舟Mod',
    version: '1.0'
}

// function 仅用于方便找到新的偏移
var HookConfig  = {
    'get_sideType':{function:'Torappu.Battle.Entity@get_sideType',offset:'0x2d661b8'},
    'GetCost':{function:'Torappu.Battle.BattleController@GetCost',offset:'0x206b004'},
    'get_blockCnt':{function:'Torappu.Battle.Entity@get_blockCnt',offset:'0x2d6512c'},
    'get_magicResistance':{function:'Torappu.Battle.Entity@get_magicResistance',offset:'0x2d65014'},
    'get_def':{function:'Torappu.Battle.Entity@get_def',offset:'0x2d64f88'},
    'CalculateDamage':{function:'Torappu.Battle.BattleFormula@CalculateDamage',offset:'0x1fe4e6c'}
};

function getHookFunc(name){
    var offset = HookConfig[name].offset;
    return getAddress(offset);
}

function getAddress(offset){
    var _addr = address;
    var _naddr = _addr.add(offset);
    return _naddr;
}

var id_101 = false,
id_102 = false,
id_103 = false,
id_104 = false,
id_105 = false,
id_106 = 10;

var address = false;

common.modmenu(Mod.name, [
    {
        'id': '9001',
        'type': 'webview',
        'data': '<center><p style="color: white;line-height: 18px;"><b>Mod Author <img src="https://ads-video-qn.xiaohongshu.com/recruit/5afd4cdff05b36f9efd4d84895d58047ef080a1d" width="18" height="18" style="border-radius: 50%;vertical-align: middle;"> FlxSNX</b></p></center>',
    },
    {
        'id': '101',
        'type': 'switch',
        'title': '无敌',
        'enable': id_101
    },
    {
        'id': '102',
        'type': 'switch',
        'title': '99Cost',
        'enable': id_102
    },
    {
        'id': '103',
        'type': 'switch',
        'title': '99阻挡',
        'enable': id_103
    },
    {
        'id': '104',
        'type': 'switch',
        'title': '增加2k双抗',
        'enable': id_104
    },
    {
        'id': '105',
        'type': 'switch',
        'title': '倍攻',
        'enable': id_105
    },
    {
        'id': '106',
        'type': 'input',
        'title': '伤害倍数',
        'val': id_106
    }
], function (data) {
    switch(data.id){
        case '101':
            id_101 = data.val;
            break;
        case '102':
            id_102 = data.val;
            break;
        case '103':
            id_103 = data.val;
            break;
        case '104':
            id_104 = data.val;
            break;
        case '105':
            id_105 = data.val;
            break;
        case '106':
            id_106 = parseInt(data.val);
            break;
        default: 
            common.toast("什么也没有发生");
    }
});

var times = setInterval(function () { 
    try {
        address = Module.findBaseAddress('libil2cpp.so')
    } catch (e) {
    }
    if (address) {
        console.log(Mod.name+':初始化成功');
        common.toast('本MOD完全免费 仅供学习与交流使用');
        clearInterval(times);
        var get_sideType = new NativeFunction(getHookFunc('get_sideType'), 'pointer', ['pointer']);  
        
        // cost 99
        Interceptor.attach(getHookFunc('GetCost'), {
            onEnter: function (args) {
            },
            onLeave: function (retval) {
                if(id_102)retval.replace(99)
            }
        });

        // 修改阻挡数量 最大99
        Interceptor.attach(getHookFunc('get_blockCnt'), {
            onEnter: function (args) {
                this.sideType = get_sideType(args[0]);
            },
            onLeave: function (retval) {
                if(this.sideType == '0x1'){
                    if(id_103)retval.replace(ptr(99))
                }
                
            }
        });

        // 修改法抗
        Interceptor.attach(getHookFunc('get_magicResistance'), {
            onEnter: function (args) {
                this.sideType = get_sideType(args[0]);
            },
            onLeave: function (retval) {
                if(this.sideType == '0x1'){
                    if(id_104){

                        let value = retval.toString() != 0 ? parseInt(retval.toString().slice(0,-8)) : 1;
                        retval.replace(ptr(2000 + value)+'00000000');
                    }
                }   
            }
        });

        // 修改防御
        Interceptor.attach(getHookFunc('get_def'), {
            onEnter: function (args) {
                this.sideType = get_sideType(args[0]);
            },
            onLeave: function (retval) {
                if(this.sideType == '0x1'){
                    if(id_104){
                        let value = parseInt(retval.toString().slice(0,-8));
                        retval.replace(ptr(2000 + value)+'00000000');
                    }
                }   
            }
        });
        
        // 倍攻 无敌
        Interceptor.attach(getHookFunc('CalculateDamage'), {
            onEnter: function (args) {
                this.target = get_sideType(args[2]);
            },
            onLeave: function (retval) {
                if(this.target != '0x1'){
                    let damage = parseInt(retval.toString().slice(0,-8));
                    if(id_105)retval.replace(ptr(damage * id_106)+'00000000');
                }else{
                    if(id_101)retval.replace('0x000000000');
                }
            }
        });
    }
},100);
