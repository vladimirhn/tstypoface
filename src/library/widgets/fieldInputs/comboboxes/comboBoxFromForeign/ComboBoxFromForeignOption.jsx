import React from "react";

export default function ComboBoxFromForeignOption({entry}) {

    return <option value={entry.id}>
        {entry.mainFieldData}
    </option>
 }