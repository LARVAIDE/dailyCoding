import React, { useState } from "react";
import about from './about.md'

const MarkdownToHtml = () => {
    return (
        <section dangerouslySetInnerHTML={{ __html: about }}></section>
    )
}

export default MarkdownToHtml