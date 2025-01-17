import { useParams } from 'react-router-dom';

function Post() {
  const { postId } = useParams();

  return (
    <div className="blog__main-post">
      <h1 className="blog__main-post-title"> Post {postId}</h1>
      <div className="blog__main-post-content">
        Lorem ipsum dolor sit amet consectetur, adipisicing elit. Enim quae eaque facilis
        consequatur nostrum libero voluptatum consequuntur velit magni quos, iste totam assumenda,
        facere repellat amet aut, iure nemo quo delectus. Neque error fugiat maxime ipsam! Quibusdam
        esse suscipit eaque nemo illo laudantium, ipsa velit numquam dolor corporis quia qui tenetur
        assumenda aliquam eligendi praesentium aspernatur iure dignissimos repellendus blanditiis
        quas maxime! Cumque earum odio assumenda ad iure aut. Officiis maxime placeat similique
        facilis vitae quaerat non soluta tenetur repellendus? Minima saepe magni sit alias. Animi
        assumenda fugit, ratione vero nihil iusto, recusandae blanditiis repellendus magni pariatur
        laudantium asperiores sint perferendis! Nulla quam nam mollitia voluptates sit cupiditate
        aspernatur totam harum omnis, id at, quo officiis ad nesciunt nemo vitae error quasi maxime!
        Quas sed hic rem blanditiis eos, voluptatem facilis animi quod, cumque voluptas placeat
        vitae temporibus. Ad minus unde culpa architecto, libero exercitationem debitis eum.
        Voluptate ad soluta a, quasi inventore voluptatem quas repellat officia porro nihil
        accusamus ut, debitis doloribus sapiente explicabo blanditiis cum eligendi obcaecati earum
        temporibus hic minus aperiam? Voluptatem quam eius, alias consequatur magnam labore
        assumenda ab dicta. Exercitationem dicta deleniti, eveniet sequi distinctio doloribus
        doloremque ipsum! Optio temporibus qui quas eligendi. Eum ratione ipsam quisquam illum
        suscipit debitis quasi, ea earum qui ut pariatur reprehenderit, totam libero fugit numquam,
        dolorum delectus expedita hic quibusdam amet eos praesentium incidunt deleniti. Eius sunt
        cumque nam ullam quas quia illo unde adipisci voluptatem voluptate, veritatis repellat
        inventore laboriosam nesciunt quos labore dicta? Vitae dolorum eligendi repellat maxime
        perspiciatis, culpa aliquid molestiae! Cumque delectus enim magni quisquam id rem, quas
        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ab saepe voluptatibus aperiam
        inventore voluptate sequi enim eum adipisci aliquam, labore blanditiis quia ex deleniti
        vitae accusantium aspernatur quasi, perferendis non culpa ipsa laudantium. Aut sint
        distinctio iste vel provident mollitia cum, maiores consequuntur. Magni aliquam nihil
        dolorem praesentium qui quia. voluptatem aperiam corrupti officiis error, exercitationem
        ducimus deserunt dicta necessitatibus obcaecati dolor beatae doloremque! Est perspiciatis
        debitis quaerat cum ullam atque neque quo eveniet explicabo obcaecati cupiditate modi labore
        eum pariatur vitae iste cumque blanditiis, rem similique?
      </div>
    </div>
  );
}

export default Post;
