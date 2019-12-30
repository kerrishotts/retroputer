# Memory Layout

Retroputer has access to 512 kilobytes of memory, split up into eight banks of 64 kilobytes each. Only the first bank can contain executable code.

Each bank is then split up into four pages of 16 kilobytes. The initial memory map at boot-up looks like the following:

![Memory Layout at boot-up](../../.gitbook/assets/image%20%289%29.png)

<table>
  <thead>
    <tr>
      <th>Bank</th>
      <th>Role</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>0</td>
      <td>
        <p>Trap Vectors</p>
        <p>KERNEL Scratch and Sprite Data</p>
        <p>System Stack</p>
        <p>User Code</p>
      </td>
    </tr>
    <tr>
      <td>1</td>
      <td>Screen Memory (by default)</td>
    </tr>
    <tr>
      <td>2</td>
      <td>General Purpose Data</td>
    </tr>
    <tr>
      <td>3</td>
      <td>General Purpose Data</td>
    </tr>
    <tr>
      <td>4</td>
      <td>General Purpose Data</td>
    </tr>
    <tr>
      <td>5</td>
      <td>General Purpose Data</td>
    </tr>
    <tr>
      <td>6</td>
      <td>General Purpose Data</td>
    </tr>
    <tr>
      <td>7</td>
      <td>ROM (Character, Palette, Kernel)</td>
    </tr>
  </tbody>
</table>Each bank is split into four pages, resulting in 32 addressable pages. Pages 28–31 are read-only \(being the entirety of bank 7\). Pages 1–3 in bank 0 can be remapped with the `MM` register. At startup, the first four pages are mapped as follows:

<table>
  <thead>
    <tr>
      <th>Page</th>
      <th>Mapping</th>
      <th>Remappable?</th>
      <th>Role</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>0</td>
      <td>0</td>
      <td>No</td>
      <td>
        <p>Trap Vectors</p>
        <p>Kernel Scratch and Sprite Data</p>
        <p>Stack</p>
        <p>User Code</p>
      </td>
    </tr>
    <tr>
      <td>1</td>
      <td>1</td>
      <td>Yes</td>
      <td>User Code and Data</td>
    </tr>
    <tr>
      <td>2</td>
      <td>2</td>
      <td>Yes</td>
      <td>User Code and Data</td>
    </tr>
    <tr>
      <td>3</td>
      <td>31</td>
      <td>Yes</td>
      <td>KERNEL (ROM)</td>
    </tr>
  </tbody>
</table>Because `MM` can be modified with the `PUSHMM` instruction, it is posible to map in code and data from any page in memory. This means that it is possible, with some clever programming, to write programs with much more code than 64 kilobytes.



