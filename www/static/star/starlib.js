/**********************
 *author: Spades
 *requirement: JQuery
 **********************/
function raty(className, config) {
    // config = {
    //     num: 5,
    //     readOnly: true,
    //     imgPath: {
    //         neg: 'images/starNeg.png',
    //         act: 'images/starAct.png',
    //     },
    //     size: 1 //单位rem
    // }


    this.init = function () {
        let ratyArray = $(className);
        for (let i = 0; i < ratyArray.length; i++) {

            let item = ratyArray[i];
            $(item).html('');
            for (let i = 0; i < config.num; i++) {
                let ratyItem = $("<span class='raty-container' data-index=" + i + "><span class='raty-content'></span></span>");
                $(item).append(ratyItem);
            }
            $(item).find('.raty-container').css({
                display: 'inline-block',
                'margin-right': '0.6rem',
                width: config.size + 'rem',
                height: config.size + 'rem',
                background: 'url(' + config.imgPath.neg + ') no-repeat',
                'background-size': '100% 100%',
            })
            $(item).find('.raty-content').css({
                float: 'left',
                display: 'inline-block',
                width: '100%',
                height: '100%',
            })
            if (!config.readOnly) {
                $(item).attr('data-score', 0);
                $(item).children('.raty-container').on('click', function (e) {
                    let index = $(e.currentTarget).attr('data-index');
                    $(item).find('.raty-content').css({
                        background: 'none',
                    })
                    let ratyContents = $(item).find('.raty-content');
                    for (let j = 0; j <= index; j++) {
                        $(ratyContents[j]).css({
                            background: 'url(' + config.imgPath.act + ') no-repeat',
                            'background-size': '100% 100%',
                        })
                    }
                    $(item).attr('data-score', Number(index) + 1);
                })
            }
        }

    }
    this.set = function () {
        let ratyArray = $(className);
        for (let i = 0; i < ratyArray.length; i++) {
            let item = ratyArray[i];
            let num = Number($(item).attr('data-score'));
            let index = parseInt(num);
            let percnet = (num - parseInt(num)) * 100;
            let ratyContents = $(item).find('.raty-content');
            $(ratyContents[index]).css({
                width: percnet + '%',
            })
            for (let j = 0; j <= index; j++) {
                $(ratyContents[j]).css({
                    background: 'url(' + config.imgPath.act + ') no-repeat',
                    'background-size': config.size + 'rem',
                })
            }

        }
    }
    this.get = function (id) {
        return $(id).attr('data-score');
    }
    this.destroy = function () {
        $(className).html('');
    }
}