<div class="materialContainer">
    <div class="box">
        <div class="title">LET`S CREATE <br> YOUR ALPACA</div>
        <div id='logout' title="Exit" type="button">&#65794;</div>
        <div class="input">
            <label for="name" class="label name">Name</label>
            <input type="text" name="name" id="name">
            <span class="spin"></span>
        </div>
        <div class="genders">
            <p class="title-2">Gender</p>
            <div>
                <div class="button standard">
                    <button class="gender-button" data-gender="female"><span>FEMALE</span> <i class="fa fa-check"></i></button>
                </div>
                <div class="button standard">
                    <button class="gender-button" data-gender="male"><span>MALE</span> <i class="fa fa-check"></i></button>
                </div>
            </div>
        </div>
        <div class="colors">
            <p class="title-2">Color</p>
            <div>
                @foreach($colors as list($colorId, $colorTitle, $colorValue))
                    <div class="color color-{{$colorTitle}}" style="background: {{$colorValue}}" data-color="{{$colorId}}"></div>
                @endforeach
            </div>
        </div>
        <div class="button standard" id="submit-create">
            <button><span>GO</span> <i class="fa fa-check"></i></button>
        </div>
    </div>
</div>
