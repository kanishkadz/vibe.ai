import React, { useState } from 'react';

const TextEditor = () => {
  const [text1, setText1] = useState(`Lorem ipsum dolor sit amet consectetur adipisicing elit. Eaque odit nisi delectus sequi recusandae illo sint in, accusantium accusamus quis, officia modi ratione quam officiis eligendi. Repudiandae, tenetur eum. Numquam accusamus odio laboriosam ex inventore repellat molestias hic impedit. Fuga tenetur ad officiis. Ipsam assumenda earum ullam magni corporis quas error aspernatur delectus tenetur ducimus officia impedit corrupti aperiam adipisci unde laborum dignissimos consequatur illo amet ea, nulla iste facere culpa. Quae non ratione ea. Perspiciatis consequuntur ab assumenda nesciunt quisquam nulla enim beatae est tenetur qui ut et nostrum error aut esse vitae, a culpa dolorum ex expedita reprehenderit.`);
  
  const [text2, setText2] = useState(`Lorem ipsum dolor sit amet consectetur adipisicing elit. Reprehenderit, similique? Nobis, labore suscipit. Esse nostrum laborum at totam, eum quae facilis ab, quas ducimus, enim iste incidunt sit omnis. Hic nobis temporibus odit iusto pariatur cumque aut corporis deserunt corrupti, eaque, illo, dolor mollitia quasi repudiandae. Dignissimos cupiditate fugit possimus ducimus odio consequatur, voluptatem enim accusamus, earum optio recusandae ipsam quia harum sunt quo aspernatur atque architecto deleniti at necessitatibus hic temporibus tenetur pariatur laboriosam? Nobis rem neque hic perferendis eligendi libero necessitatibus eos placeat ipsa, dolor commodi voluptatem doloremque tempore aspernatur aut! Unde velit nesciunt sequi temporibus id libero!`);

  return (
    <div className='w-full max-w-md bg-[#1a1a1a] rounded-xl p-6 text-white'>
      <textarea
        className='w-full bg-transparent border border-gray-700 rounded-md p-2 resize-none leading-relaxed text-white'
        value={text1}
        onChange={(e) => setText1(e.target.value)}
        rows={10}
      />
      <textarea
        className='w-full bg-transparent border border-gray-700 rounded-md p-2 mt-4 resize-none leading-relaxed text-white'
        value={text2}
        onChange={(e) => setText2(e.target.value)}
        rows={10}
      />
    </div>
  );
};

export default TextEditor;
