const TESLA_API = 'https://raw.githubusercontent.com/brightestsirius/Front-end-Pro-19/master/lesson_27/tesla.json';
const IMAGE_TESLA_API = 'https://mc-astro.github.io/tesla-roadster-colors/img';

const getTeslaData = successCb => {
    $.ajax({
        url: TESLA_API,
        method: 'GET',
        dataType: 'json',
        success: responce => successCb(responce),
        error: error => console.error(error)
    })
}

const renderTesla = (dataOfCars) => {
    $('body').prepend($('<div>').addClass('wrapper'));

    $img = $('<img>').addClass('image').attr({
        src: `${IMAGE_TESLA_API}/${dataOfCars[0].img}.jpg`,
        alt: `${dataOfCars[0].title}`
    })
    $('.wrapper').append($img);

    $h1 = $('<h1>').addClass('title').text(`${dataOfCars[0].title}`);
    $('.wrapper').append($h1);

    $ul = $('<ul>').addClass('list');
    $('.wrapper').append($ul);

    dataOfCars.reverse().forEach(item => {
        const $button = $('<button>').css('background', item.color).addClass('button').data({ color: item.img, title: item.title });
        const $li = $('<li>');

        $li.append($button);
        $ul.append($li);
    });

    $ul.on('click', 'button', function () {
        $('.button').each((ind, element) => {
            $(element).removeClass('current');
        });

        $img.attr({
            src: `${IMAGE_TESLA_API}/${$(this).data('color')}.jpg`,
            alt: $(this).data('title')
        });

        $h1.text($(this).data('title'));

        $(this).addClass('current');
    })

}

$(document).ready(() => getTeslaData(renderTesla));