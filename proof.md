# Mathematical Proof that Probabilities are Equal between the implementations of Any

Claim: Consider a list of length nn containing kk true values (T) and n−kn−k false values (F). The list is uniformly shuffled so that each of the (nk)(kn​) ways of placing the kk T’s among the nn positions is equally likely. After shuffling, an algorithm sequentially scans the list from left to right and stops when it encounters the first T. We claim that each individual T is equally likely to be the first encountered T, and thus the probability that any particular T is chosen is 1kk1​.

Proof:

    Setup and Notation: Let the set of T’s be {T1,T2,…,Tk}{T1​,T2​,…,Tk​} and the set of F’s be {F1,F2,…,Fn−k}{F1​,F2​,…,Fn−k​}. The total number of ways to arrange these nn distinct elements is n!n!. However, we are only interested in the relative positions of T’s and F’s, not their individual identities, so each arrangement of the kk T’s among the nn positions is equally likely. There are (nk)(kn​) such arrangements.

    Symmetry in Positioning: Before we know the order, each T is indistinguishable from the others. The uniform shuffle assigns an equal probability 1(nk)(kn​)1​ to each way of distributing the kk T’s among the nn positions.

    Because of this uniform distribution, each T is equally likely to appear in any specific position of the list. There is no inherent bias toward any particular T.

    Event of Interest – "Earliest T": After the shuffle, define the event Ei={"Ti is the earliest T"}Ei​={"Ti​ is the earliest T"}. We want to show that:
    P(E1)=P(E2)=⋯=P(Ek).
    P(E1​)=P(E2​)=⋯=P(Ek​).

    Since one and only one T can be the earliest in any given permutation (ties are impossible in a strict linear order), we have:
    P(E1)+P(E2)+⋯+P(Ek)=1.
    P(E1​)+P(E2​)+⋯+P(Ek​)=1.

    Symmetry Argument for Equal Probabilities: Consider any particular T, say T1T1​. Because all T’s are identical before the shuffle and the shuffle is uniform, there is no statistical difference between T1T1​ and T2T2​ (or any other TiTi​). Every distribution of T’s where T1T1​ is earliest has a “mirror” scenario obtained by renaming T’s. For instance, a particular arrangement where T1T1​ is earliest can be transformed into an equally likely arrangement where T2T2​ is earliest by simply swapping the labels of T1T1​ and T2T2​.

    More formally, consider a bijection ff that permutes the labels of the T’s. Given any arrangement where TiTi​ is earliest, applying ff yields an arrangement with probability identical under the uniform shuffle but where f(Ti)f(Ti​) is earliest. Since all permutations of labels are equally likely, this establishes that:
    P(E1)=P(E2)=⋯=P(Ek).
    P(E1​)=P(E2​)=⋯=P(Ek​).

    This follows from the principle of symmetry: no T has a privileged position before the shuffle, so no T should have a different probability from any other T of ending up earliest.

    Summation to Unity: Since exactly one T is earliest in any given arrangement, and all EiEi​ events are mutually exclusive and collectively exhaustive:
    P(E1)+P(E2)+⋯+P(Ek)=1.
    P(E1​)+P(E2​)+⋯+P(Ek​)=1.

    Given that all these probabilities are equal:
    k⋅P(E1)=1  ⟹  P(E1)=1k.
    k⋅P(E1​)=1⟹P(E1​)=k1​.

    By the symmetry argument, this holds for every ii:
    P(Ei)=1kfor all i=1,2,…,k.
    P(Ei​)=k1​for all i=1,2,…,k.

Conclusion: Each T is equally likely to be the earliest T encountered by the sequential scan, and thus the probability that any particular T is chosen by the algorithm is 1kk1​. This proof relies fundamentally on the symmetry and uniformity of the random permutation, which ensures that no T is favored over another prior to the scanning process.
