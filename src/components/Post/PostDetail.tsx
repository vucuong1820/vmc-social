import React from 'react';
import PropTypes from 'prop-types';
import Title from '../Title';
import NavBar from '../NavBar';

PostDetail.propTypes = {};

function PostDetail(props) {
  return (
    <>
      <Title value="Explore - VMC Social" />
      <div className="mx-[7vw] flex min-h-screen flex-col items-stretch">
        <NavBar />
        <div className="container mx-auto flex flex-wrap py-6 ">
          <section className="flex w-full flex-col items-center px-3 md:w-9/12">
            <article className="my-4 flex flex-col overflow-hidden rounded-2xl shadow ">
              <a href="#" className="">
                <img className="w-full" src="https://source.unsplash.com/collection/1346951/1000x500?sig=1" />
              </a>
              <div className="flex flex-col justify-start bg-dark-lighten p-8">
                <a href="#" className="pb-4 text-sm font-bold uppercase text-blue-700">
                  Technology
                </a>
                <a href="#" className="pb-4 text-3xl  font-bold">
                  Lorem Ipsum Dolor Sit Amet Dolor Sit Amet
                </a>
                <a href="#" className="pb-8 text-sm italic opacity-60">
                  By{' '}
                  <a href="#" className="font-semibold ">
                    David Grzyb
                  </a>
                  , Published on April 25th, 2020
                </a>
                <h1 className="pb-3 text-2xl font-bold">Introduction</h1>
                <p className="pb-3">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur vel neque non libero suscipit
                  suscipit eu eu urna. Proin bibendum urna mattis ante malesuada ultrices. Etiam in turpis vitae elit
                  dictum aliquet. Donec mattis risus in turpis dapibus, eget tempus sem tincidunt. Orci varius natoque
                  penatibus et magnis dis parturient montes, nascetur ridiculus mus. In est enim, imperdiet sed ornare
                  quis, pellentesque vel risus. Nunc vitae vestibulum turpis. Quisque eget eleifend urna. Etiam et
                  vulputate purus, ut egestas sem. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices
                  posuere cubilia Curae; Duis quis neque non urna venenatis mollis et at massa. Pellentesque sem lacus,
                  malesuada vel hendrerit molestie, mollis vel elit.
                </p>
                <h1 className="pb-3 text-2xl font-bold">Heading</h1>
                <p className="pb-3">
                  Vivamus nec facilisis elit, quis congue justo. In non augue ex. Aenean pretium facilisis hendrerit.
                  Sed sed imperdiet dui. Etiam faucibus a diam sed vehicula. Nullam commodo lacus tincidunt, tincidunt
                  orci sed, dapibus leo. Vivamus vulputate quis risus a ultricies. Aliquam luctus id tellus non
                  condimentum. Aenean maximus viverra ipsum eget vestibulum. Morbi ut tincidunt sem, efficitur volutpat
                  tortor. Donec scelerisque, ipsum eu efficitur semper, neque turpis sodales quam, in aliquam elit lacus
                  varius lorem. Ut ut diam id leo efficitur malesuada eget in velit. Pellentesque tristique orci nunc,
                  vitae fermentum nibh luctus eu. Mauris condimentum justo sed ipsum egestas varius.
                </p>
                <p className="pb-3">
                  Sed sagittis odio a volutpat feugiat. Cras aliquam varius justo, a rhoncus ante bibendum id. Nulla
                  maximus nisl sed enim maximus, ut dictum lectus hendrerit. Fusce venenatis tincidunt eros. Phasellus
                  quis augue vulputate ipsum pellentesque fringilla. Morbi nec tempor felis. Maecenas sollicitudin
                  pellentesque dui, sit amet scelerisque mauris elementum nec. Cras ante metus, mattis in malesuada in,
                  fermentum a nunc. Suspendisse potenti. Sed tempor lacus sed commodo dignissim. Quisque dictum, dolor
                  auctor iaculis cursus, ipsum urna porttitor ex, sed consequat nisi tellus eget ante. Duis molestie
                  mollis eros, eu sollicitudin mauris lobortis quis.
                </p>
                <p className="pb-3">
                  Vivamus sed neque nec massa scelerisque imperdiet eget id sapien. Fusce elementum mi id malesuada
                  luctus. Proin quis lorem id leo porta interdum non ac nisl. Integer nulla sem, ultrices sed neque
                  eget, blandit condimentum metus. Aliquam eget malesuada sapien. Curabitur aliquet orci sit amet ex
                  tincidunt convallis. Mauris urna mi, consequat mattis mollis a, dignissim eget sem. Vestibulum ante
                  ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Nam facilisis sem diam,
                  viverra consequat metus consequat vel. Cras a mi eu ex luctus malesuada quis eu ante. Aliquam erat
                  volutpat.
                </p>
                <h1 className="pb-3 text-2xl font-bold">Conclusion</h1>
                <p className="pb-3">
                  Donec vulputate auctor leo lobortis congue. Sed elementum pharetra turpis. Nulla at condimentum odio.
                  Vestibulum ullamcorper enim eget porttitor bibendum. Proin eros nibh, maximus vitae nisi a, blandit
                  ultricies lectus. Vivamus eu maximus lacus. Maecenas imperdiet iaculis neque, vitae efficitur felis
                  vestibulum sagittis. Nunc a eros aliquet, egestas tortor hendrerit, posuere diam. Proin laoreet,
                  ligula non eleifend bibendum, orci nulla luctus ipsum, dignissim convallis quam dolor et nulla.
                </p>
              </div>
            </article>
          </section>
          <aside className="flex w-full flex-col items-center px-3 md:w-3/12">

          <div className="my-4 flex w-full flex-col bg-dark-lighten p-6 shadow rounded-xl">
            <div className="grid grid-cols-1">
              <img className="hover:opacity-75 rounded-md w-full mb-3" src="https://source.unsplash.com/collection/1346951/150x150?sig=1" />
              <img className="hover:opacity-75 rounded-md w-full mb-3" src="https://source.unsplash.com/collection/1346951/150x150?sig=1" />
              <img className="hover:opacity-75 rounded-md w-full mb-3" src="https://source.unsplash.com/collection/1346951/150x150?sig=1" />
              
            </div>
            <a
              href="#"
              className="mt-6 flex w-full items-center justify-center rounded-md bg-blue-800 px-2 py-3 text-sm font-bold uppercase text-white hover:bg-blue-700"
            >
              <i className="fas fa-film w-[24px] text-xl mr-2"></i> Related movie
            </a>
          </div>
        </aside>
        </div>
        
      </div>
    </>
  );
}

export default PostDetail;
