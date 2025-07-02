import {ChangeDetectionStrategy, Component} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Subscription, tap} from "rxjs";

@Component({
    selector: 'about',
    styleUrl: './about.styles.scss',
    standalone: true, changeDetection: ChangeDetectionStrategy.OnPush,
    template: `
        <div class="content">
            {{ content }}
        </div>
    `
})
export class About {
    content: string = `
    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis ullamcorper nisi quis mollis tempus. Vestibulum sit amet justo gravida, dapibus risus sit amet, volutpat felis. Phasellus non lacinia lorem. Pellentesque diam nisi, aliquam non erat eget, interdum mattis nibh. Aenean sed nulla et diam consectetur suscipit. Vivamus pretium mi ac leo malesuada, eget aliquam lacus rutrum. Nam non metus felis. In faucibus lorem eu ligula finibus, at pulvinar nunc maximus. Nunc eleifend felis eget mi interdum bibendum.
    
    Nunc rutrum nisl et lobortis porttitor. Sed commodo et leo id tincidunt. Phasellus accumsan ipsum a urna sagittis, nec sollicitudin elit ultrices. Praesent quis iaculis leo. Aliquam erat volutpat. Morbi congue lobortis maximus. Donec nisi enim, dapibus pharetra sagittis at, venenatis vitae quam. Nunc quis hendrerit arcu, sit amet consectetur dui. Aenean dignissim bibendum lacus nec tempus. Duis eu lorem velit. Etiam ultricies ex at tellus mattis, sed mollis nisi suscipit.
    
    Sed in mauris molestie, congue tortor vel, congue urna. Aliquam eget dui hendrerit, feugiat eros id, scelerisque turpis. Nunc purus massa, efficitur eu faucibus nec, sagittis nec metus. Proin imperdiet porttitor leo quis feugiat. Donec vulputate velit vitae velit feugiat tempus. Morbi eleifend finibus orci, ac pulvinar nulla placerat nec. Sed laoreet nisi ac nisi pellentesque faucibus. Vestibulum hendrerit suscipit risus sit amet consequat. Nullam ut libero semper, tincidunt turpis dignissim, blandit lectus. Fusce mattis ligula augue, a euismod est tempor vel.`

    constructor(http: HttpClient) {
    }

}
